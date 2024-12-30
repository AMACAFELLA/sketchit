import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { useAuth } from '../context/AuthContext';
import { playerService } from '../services/dynamodb/playerService';
import { drawingService } from '../services/dynamodb/drawingService';
import { useToastContext } from '../context/ToastContext';

const Results = () => {
  const navigate = useNavigate();
  const { drawings, score, resetGame } = useGame();
  const { user } = useAuth();
  const { showToast } = useToastContext();

  useEffect(() => {
    let isMounted = true;

    const saveResults = async () => {
      if (!user || !drawings.length || !isMounted) return;

      try {
        // Save each drawing first
        for (const drawing of drawings) {
          await drawingService.saveDrawing(
            user.userId,
            drawing.word,
            drawing.image
          );
        }

        // Update player stats only once per game
        await playerService.updatePlayerStats(user.userId, {
          score,
          correctDrawings: drawings.length
        });
        
        // Update leaderboard
        await playerService.updateLeaderboard(user.userId, score);
      } catch (error) {
        console.error('Error saving results:', error);
        showToast('Failed to save some results', 'error');
      }
    };

    saveResults();

    return () => {
      isMounted = false;
    };
  }, [user, drawings, score, showToast]);

  const handlePlayAgain = () => {
    resetGame();
    navigate('/game', { state: { fromHome: true } });
  };

  const handleGoHome = () => {
    resetGame();
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen bg-paper p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="font-sketch text-4xl text-pencil-dark mb-4">
            Game Results
          </h1>
          <p className="font-sketch text-2xl text-pencil-dark mb-8">
            Final Score: {score}
          </p>
        </motion.div>

        {drawings.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="font-sketch text-2xl text-pencil-dark mb-4 text-center">
              Your Drawings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {drawings.map((drawing, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg p-4 shadow-sketch"
                >
                  <h3 className="font-sketch text-xl text-pencil-dark mb-2 text-center capitalize">
                    {drawing.word}
                  </h3>
                  <div className="aspect-square w-full relative overflow-hidden rounded-md">
                    <img
                      src={drawing.image}
                      alt={`Drawing of ${drawing.word}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-4"
        >
          <button onClick={handleGoHome} className="sketch-button">
            Home
          </button>
          <button onClick={handlePlayAgain} className="sketch-button">
            Play Again
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Results;