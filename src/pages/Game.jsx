import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import DrawingCanvas from '../components/Canvas/DrawingCanvas';
import WordBlocks from '../components/UI/WordBlocks';
import GameInfo from '../components/UI/GameInfo';
import Toast from '../components/UI/Toast';
import ConfirmationModal from '../components/UI/ConfirmationModal';
import { useGame } from '../context/GameContext';
import { useToast } from '../hooks/useToast';

const Game = () => {
  const { 
    currentWord, 
    revealedLetters, 
    handleDrawingSubmit, 
    startGame, 
    isGameStarted,
    pauseTimer,
    resumeTimer,
    endGame 
  } = useGame();
  const { toast, hideToast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const [showExitModal, setShowExitModal] = useState(false);

  useEffect(() => {
    // Start the game only if coming from the home page
    if (location.state?.fromHome && !isGameStarted) {
      startGame();
    }

    // Handle browser's back button
    const handlePopState = (event) => {
      event.preventDefault();
      if (isGameStarted) {
        pauseTimer();
        setShowExitModal(true);
        // Push a new entry to prevent immediate navigation
        window.history.pushState(null, '', window.location.pathname);
      }
    };

    // Push initial state to enable popstate handling
    window.history.pushState(null, '', window.location.pathname);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      if (isGameStarted) {
        endGame();
      }
    };
  }, [location, startGame, isGameStarted, pauseTimer, endGame]);

  // Handle browser's beforeunload
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isGameStarted) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isGameStarted]);

  const handleBackClick = useCallback(() => {
    if (isGameStarted) {
      pauseTimer();
      setShowExitModal(true);
    } else {
      navigate('/');
    }
  }, [isGameStarted, navigate, pauseTimer]);

  const handleModalClose = useCallback(() => {
    setShowExitModal(false);
    resumeTimer();
    // Ensure we have a history entry to go back to
    window.history.pushState(null, '', window.location.pathname);
  }, [resumeTimer]);

  const handleConfirmExit = useCallback(() => {
    setShowExitModal(false);
    endGame();
    navigate('/');
  }, [navigate, endGame]);

  return (
    <div className="min-h-screen bg-paper p-8">
      <div className="max-w-2xl mx-auto relative">
        <button
          onClick={handleBackClick}
          className="absolute left-0 -top-2 sketch-button hover:bg-paper/80 active:bg-paper/60 transition-colors"
        >
          ← Back
        </button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="font-sketch text-4xl text-pencil-dark mb-2">
            Sketch & Guess!
          </h1>
          <GameInfo />
        </motion.div>

        <WordBlocks word={currentWord} revealedLetters={revealedLetters} />
        <DrawingCanvas onSubmit={handleDrawingSubmit} currentWord={currentWord} />
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />

      <ConfirmationModal
        isOpen={showExitModal}
        onClose={handleModalClose}
        onConfirm={handleConfirmExit}
        title="Leave Game?"
        message="Are you sure you want to leave? Your current game progress will be lost."
      />
    </div>
  );
};

export default Game;
