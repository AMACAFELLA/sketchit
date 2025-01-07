import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { getRandomWord, DIFFICULTY } from '../utils/wordList';
import { drawingService } from '../services/dynamodb/drawingService';
import { playerService } from '../services/dynamodb/playerService';
import { useAuth } from './AuthContext';

const GameContext = createContext();

const getDifficultyForScore = (score) => {
  if (score >= 100) return DIFFICULTY.EXPERT;
  if (score >= 60) return DIFFICULTY.HARD;
  if (score >= 30) return DIFFICULTY.MEDIUM;
  return DIFFICULTY.EASY;
};

export const GameProvider = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentWordData, setCurrentWordData] = useState(() => getRandomWord());
  const [drawings, setDrawings] = useState([]);
  const [score, setScore] = useState(0);
  const [hintPoints, setHintPoints] = useState(30); // Separate points for hints
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('highScore');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [attempts, setAttempts] = useState(0);
  const [revealedLetters, setRevealedLetters] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const timerRef = useRef(null);

  // Update high score when current score exceeds it
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('highScore', score.toString());
    }
  }, [score, highScore]);

  const pauseTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const resumeTimer = useCallback(() => {
    if (!timerRef.current && timeLeft > 0 && isGameStarted) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
  }, [timeLeft, isGameStarted]);

  const endGame = useCallback(() => {
    pauseTimer();
    setIsGameStarted(false);
    setTimeLeft(0);
    setHintPoints(30); // Reset hint points
    setAttempts(0);
    setRevealedLetters([]);
    setCurrentWordData(getRandomWord(DIFFICULTY.EASY));
  }, [pauseTimer]);

  useEffect(() => {
    if (isGameStarted && timeLeft > 0 && !isAnalyzing) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isGameStarted) {
      clearInterval(timerRef.current);
      endGame();
      navigate('/results');
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [timeLeft, navigate, isGameStarted, isAnalyzing, endGame]);

  const startGame = useCallback(() => {
    setIsGameStarted(true);
    setTimeLeft(60);
    setScore(0);
    setHintPoints(30); // Start with 30 hint points
    setAttempts(0);
    setRevealedLetters([]);
    setDrawings([]); // Clear drawings when starting a new game
    setCurrentWordData(getRandomWord(DIFFICULTY.EASY));
  }, []);

  const handleDrawingSubmit = async (imageData) => {
    setIsAnalyzing(true);
    pauseTimer();

    try {
      // Store the drawing
      const newDrawing = {
        word: currentWordData.word,
        image: imageData,
        difficulty: currentWordData.difficulty,
        category: currentWordData.category,
        timestamp: new Date().toISOString()
      };

      // Save drawing immediately to DynamoDB and S3
      if (user?.userId) {
        console.log('Saving drawing for user:', user.userId); // Debug log
        try {
          await drawingService.saveDrawing(
            user.userId,
            newDrawing.word,
            newDrawing.image,
            newDrawing.category,
            newDrawing.difficulty
          );
          console.log('Drawing saved successfully');
        } catch (error) {
          console.error('Failed to save drawing:', error);
        }
      } else {
        console.log('No user ID available, skipping drawing save');
      }

      setDrawings(prev => [...prev, newDrawing]);

      // Update score based on difficulty
      const scoreIncrease = {
        [DIFFICULTY.EASY]: 10,
        [DIFFICULTY.MEDIUM]: 15,
        [DIFFICULTY.HARD]: 20,
        [DIFFICULTY.EXPERT]: 30,
      }[currentWordData.difficulty];

      const newScore = score + scoreIncrease;
      setScore(newScore);
      
      // Update leaderboard immediately if user is authenticated
      if (user?.userId) {
        console.log('Updating leaderboard for user:', user);  // Debug full user object
        console.log('Current score:', score);
        console.log('Score increase:', scoreIncrease);
        console.log('New score:', newScore);
        try {
          await playerService.updateLeaderboard(user.userId, newScore);
          console.log('Leaderboard updated successfully');
        } catch (error) {
          console.error('Failed to update leaderboard:', error);
        }
      } else {
        console.log('User not authenticated, skipping leaderboard update. User:', user);
      }

      setAttempts(prev => prev + 1);
      setRevealedLetters([]);
      
      // Adjust time based on difficulty
      const timeForDifficulty = {
        [DIFFICULTY.EASY]: 60,
        [DIFFICULTY.MEDIUM]: 50,
        [DIFFICULTY.HARD]: 45,
        [DIFFICULTY.EXPERT]: 40,
      }[currentWordData.difficulty];
      
      setTimeLeft(timeForDifficulty);

      // Get next word with appropriate difficulty
      const nextDifficulty = getDifficultyForScore(newScore);
      setCurrentWordData(getRandomWord(nextDifficulty));
      
    } catch (error) {
      console.error('Error processing drawing:', error);
    } finally {
      setIsAnalyzing(false);
      resumeTimer();
    }
  };

  const revealLetter = () => {
    const unrevealedIndices = currentWordData.word
      .split('')
      .map((_, index) => index)
      .filter((index) => !revealedLetters.includes(index));

    if (unrevealedIndices.length === 0) return;

    const randomIndex =
      unrevealedIndices[
        Math.floor(Math.random() * unrevealedIndices.length)
      ];

    // First use hint points, then use score points
    if (hintPoints >= 10) {
      setHintPoints((prev) => prev - 10);
      setRevealedLetters((prev) => [...prev, randomIndex]);
    } else if (score >= 10) {
      setScore((prev) => prev - 10);
      setRevealedLetters((prev) => [...prev, randomIndex]);
    }
  };

  return (
    <GameContext.Provider
      value={{
        currentWord: currentWordData.word,
        currentCategory: currentWordData.category,
        currentDifficulty: currentWordData.difficulty,
        revealedLetters,
        timeLeft,
        score,
        hintPoints,
        highScore,
        attempts,
        drawings,
        isGameStarted,
        isAnalyzing,
        startGame,
        handleDrawingSubmit,
        revealLetter,
        pauseTimer,
        resumeTimer,
        endGame
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};