import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useMultiplayer } from '../context/MultiplayerContext';
import { useToastContext } from '../context/ToastContext';
import GameContainer from '../components/Layout/GameContainer';

const Multiplayer = () => {
  const navigate = useNavigate();
  const { showToast } = useToastContext();
  const { createGame, joinGame, currentGame, players, isConnected } = useMultiplayer();
  const [gameCode, setGameCode] = useState('');
  const [isJoining, setIsJoining] = useState(false);

  const handleCreateGame = async () => {
    try {
      const gameId = await createGame('classic');
      showToast('Game created! Share the code: ' + gameId, 'success');
    } catch (error) {
      showToast('Failed to create game', 'error');
    }
  };

  const handleJoinGame = async () => {
    if (!gameCode.trim()) {
      showToast('Please enter a game code', 'error');
      return;
    }

    try {
      await joinGame(gameCode);
      showToast('Successfully joined game!', 'success');
    } catch (error) {
      showToast('Failed to join game', 'error');
    }
  };

  useEffect(() => {
    if (currentGame) {
      navigate('/game/multiplayer/' + currentGame.id);
    }
  }, [currentGame, navigate]);

  return (
    <GameContainer>
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="font-sketch text-4xl text-pencil-dark mb-4">
            Multiplayer
          </h1>
          <p className="font-sketch text-xl text-pencil-dark/70 mb-8">
            Play with friends in real-time!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Create Game */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="sketch-card"
          >
            <h2 className="font-sketch text-2xl text-pencil-dark mb-4">
              Create New Game
            </h2>
            <button
              onClick={handleCreateGame}
              disabled={!isConnected}
              className="sketch-button w-full"
            >
              Create Game
            </button>
          </motion.div>

          {/* Join Game */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="sketch-card"
          >
            <h2 className="font-sketch text-2xl text-pencil-dark mb-4">
              Join Game
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                value={gameCode}
                onChange={(e) => setGameCode(e.target.value)}
                placeholder="Enter game code"
                className="sketch-input w-full"
              />
              <button
                onClick={handleJoinGame}
                disabled={!isConnected || !gameCode.trim()}
                className="sketch-button w-full"
              >
                Join Game
              </button>
            </div>
          </motion.div>
        </div>

        {/* Active Players */}
        {players.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 sketch-card"
          >
            <h2 className="font-sketch text-2xl text-pencil-dark mb-4">
              Players ({players.length})
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {players.map((player) => (
                <div
                  key={player.id}
                  className="p-3 bg-white/50 rounded-lg text-center"
                >
                  <p className="font-sketch text-lg">{player.username}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </GameContainer>
  );
};

export default Multiplayer;