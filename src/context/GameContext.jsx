import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { getRandomWord } from '../utils/wordList';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const navigate = useNavigate();
  const [currentWordData, setCurrentWordData] = useState(() => getRandomWord());
  const [drawings, setDrawings] = useState([]);
  const [score, setScore] = useState(30);
  const [attempts, setAttempts] = useState(0);
  const [revealedLetters, setRevealedLetters] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const timerRef = useRef(null);

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

  useEffect(() => {
    if (isGameStarted && timeLeft > 0 && !isAnalyzing) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(timerRef.current);
      navigate('/results');
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [timeLeft, navigate, isGameStarted, isAnalyzing]);

  const startGame = () => {
    setIsGameStarted(true);
    setTimeLeft(60);
    setScore(30);
    setAttempts(0);
    setRevealedLetters([]);
    setCurrentWordData(getRandomWord());
  };

  const handleDrawingSubmit = async (imageData) => {
    setIsAnalyzing(true);
    clearInterval(timerRef.current);

    try {
      setDrawings((prev) => [
        ...prev,
        {
          word: currentWordData.word,
          image: imageData,
        },
      ]);
      setScore((prev) => prev + 10);
      setAttempts((prev) => prev + 1);
      setRevealedLetters([]);
      setTimeLeft(60);

      if (attempts >= 2) {
        navigate('/results');
      } else {
        setCurrentWordData(getRandomWord());
      }
    } catch (error) {
      console.error('Error processing drawing:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const revealLetter = () => {
    if (score >= 10) {
      const unrevealedIndices = currentWordData.word
        .split('')
        .map((_, index) => index)
        .filter((index) => !revealedLetters.includes(index));

      if (unrevealedIndices.length > 0) {
        const randomIndex =
          unrevealedIndices[
            Math.floor(Math.random() * unrevealedIndices.length)
          ];
        setRevealedLetters((prev) => [...prev, randomIndex]);
        setScore((prev) => prev - 10);
      }
    }
  };

  const resetGame = () => {
    setDrawings([]);
    setScore(30);
    setAttempts(0);
    setRevealedLetters([]);
    setTimeLeft(60);
    setIsGameStarted(false);
    setCurrentWordData(getRandomWord());
  };

  return (
    <GameContext.Provider
      value={{
        currentWord: currentWordData.word,
        currentCategory: currentWordData.category,
        drawings,
        score,
        attempts,
        timeLeft,
        revealedLetters,
        isAnalyzing,
        handleDrawingSubmit,
        revealLetter,
        resetGame,
        startGame,
        isGameStarted,
        pauseTimer,
        resumeTimer,
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