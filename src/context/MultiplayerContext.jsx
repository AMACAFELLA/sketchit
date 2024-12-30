import React, { createContext, useContext, useState, useEffect } from 'react';
import { multiplayerService } from '../services/multiplayer/multiplayerService';
import { useAuth } from './AuthContext';
import { useToastContext } from './ToastContext';

const MultiplayerContext = createContext(null);

export const MultiplayerProvider = ({ children }) => {
  const [currentGame, setCurrentGame] = useState(null);
  const [players, setPlayers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const { user } = useAuth();
  const { showToast } = useToastContext();

  useEffect(() => {
    if (user) {
      multiplayerService.connect(user.id);
      setIsConnected(true);

      multiplayerService.on('gameStart', (data) => {
        setCurrentGame(data);
        showToast('Game starting!', 'success');
      });

      multiplayerService.on('playerJoined', (data) => {
        setPlayers(data.players);
        showToast(`${data.player.username} joined!`, 'success');
      });

      multiplayerService.on('playerLeft', (data) => {
        setPlayers(data.players);
        showToast(`${data.player.username} left`, 'info');
      });

      return () => {
        multiplayerService.disconnect();
        setIsConnected(false);
      };
    }
  }, [user, showToast]);

  const createGame = async (gameMode) => {
    try {
      const gameId = await multiplayerService.createGame(gameMode);
      showToast('Game created! Waiting for players...', 'success');
      return gameId;
    } catch (error) {
      showToast('Failed to create game', 'error');
      throw error;
    }
  };

  const joinGame = async (gameId) => {
    try {
      await multiplayerService.joinGame(gameId);
      showToast('Joined game!', 'success');
    } catch (error) {
      showToast('Failed to join game', 'error');
      throw error;
    }
  };

  const leaveGame = async () => {
    if (currentGame) {
      await multiplayerService.leaveGame(currentGame.id);
      setCurrentGame(null);
      setPlayers([]);
    }
  };

  return (
    <MultiplayerContext.Provider
      value={{
        currentGame,
        players,
        isConnected,
        createGame,
        joinGame,
        leaveGame,
      }}
    >
      {children}
    </MultiplayerContext.Provider>
  );
};

export const useMultiplayer = () => {
  const context = useContext(MultiplayerContext);
  if (!context) {
    throw new Error('useMultiplayer must be used within a MultiplayerProvider');
  }
  return context;
};