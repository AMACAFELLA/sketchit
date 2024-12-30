import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import DrawingCanvas from '../components/Canvas/DrawingCanvas';
import WordBlocks from '../components/UI/WordBlocks';
import GameInfo from '../components/UI/GameInfo';
import Toast from '../components/UI/Toast';
import { useGame } from '../context/GameContext';
import { useToast } from '../hooks/useToast';
import { useLocation } from 'react-router-dom';

const Game = () => {
  const { currentWord, revealedLetters, handleDrawingSubmit, startGame, isGameStarted } = useGame();
  const { toast, hideToast } = useToast();
  const location = useLocation();

  useEffect(() => {
    // Start the game only if coming from the home page
    if (location.state?.fromHome && !isGameStarted) {
      startGame();
    }
  }, [location, startGame, isGameStarted]);

  return (
    <div className="min-h-screen bg-paper p-8">
      <div className="max-w-2xl mx-auto">
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
    </div>
  );
};

export default Game;
