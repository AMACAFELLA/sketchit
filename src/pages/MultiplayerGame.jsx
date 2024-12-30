import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMultiplayer } from '../context/MultiplayerContext';
import { useToastContext } from '../context/ToastContext';
import DrawingCanvas from '../components/Canvas/DrawingCanvas';
import WordBlocks from '../components/UI/WordBlocks';
import GameContainer from '../components/Layout/GameContainer';

const MultiplayerGame = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToastContext();
  const { 
    currentGame,
    players,
    leaveGame,
    submitDrawing
  } = useMultiplayer();
  
  const [currentWord, setCurrentWord] = useState('');
  const [revealedLetters, setRevealedLetters] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (!currentGame) {
      navigate('/multiplayer');
    }

    return () => {
      leaveGame(gameId);
    };
  }, [currentGame, gameId, navigate]);

  const handleDrawingSubmit = async (imageData) => {
    try {
      await submitDrawing(gameId, {
        image: imageData,
        word: currentWord
      });
      showToast('Drawing submitted!', 'success');
    } catch (error) {
      showToast('Failed to submit drawing', 'error');
    }
  };

  return (
    <GameContainer>
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Game Area */}
          <div className="md:col-span-2">
            <WordBlocks word={currentWord} revealedLetters={revealedLetters} />
            <DrawingCanvas 
              onSubmit={handleDrawingSubmit}
              currentWord={currentWord}
            />
          </div>

          {/* Players List */}
          <div className="sketch-card">
            <h2 className="font-sketch text-2xl text-pencil-dark mb-4">
              Players
            </h2>
            <div className="space-y-2">
              {players.map((player) => (
                <div
                  key={player.id}
                  className="p-2 bg-white/50 rounded-lg flex items-center justify-between"
                >
                  <span className="font-sketch">{player.username}</span>
                  <span className="font-sketch text-sm">
                    {player.score || 0} pts
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </GameContainer>
  );
};

export default MultiplayerGame;