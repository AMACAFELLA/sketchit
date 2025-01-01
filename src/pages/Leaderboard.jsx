import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { playerService } from '../services/dynamodb/playerService';
import GameContainer from '../components/Layout/GameContainer';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await playerService.getLeaderboard();
        setLeaderboard(data);
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
        setError('Failed to load leaderboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <div className="text-center font-sketch text-xl">Loading...</div>;
  if (error) return <div className="text-center font-sketch text-xl text-red-500">Error: {error}</div>;

  return (
    <GameContainer>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="font-sketch text-4xl text-pencil-dark mb-4">
            Leaderboard
          </h1>
        </motion.div>

        <div className="bg-white rounded-lg shadow-sketch overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-pencil-dark/10 bg-paper">
            <div className="col-span-2 font-sketch text-lg text-pencil-dark">Rank</div>
            <div className="col-span-7 font-sketch text-lg text-pencil-dark flex items-center">Player</div>
            <div className="col-span-3 font-sketch text-lg text-pencil-dark text-right">Score</div>
          </div>

          {/* Leaderboard entries */}
          <div className="divide-y divide-pencil-dark/10">
            {leaderboard.map((entry, index) => (
              <motion.div
                key={`${entry.playerId}-${entry.timestamp}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-paper/50 transition-colors"
              >
                <div className="col-span-2 font-sketch text-xl text-pencil-dark">
                  #{index + 1}
                </div>
                <div className="col-span-7 font-sketch text-lg text-pencil-dark flex items-center gap-3">
                  {entry.customization?.profilePicture ? (
                    <img
                      src={entry.customization.profilePicture}
                      alt={`${entry.playerName}'s profile`}
                      className="w-8 h-8 rounded-full border-2 border-pencil-dark object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full border-2 border-pencil-dark bg-paper flex items-center justify-center">
                      <span className="font-sketch text-xs text-pencil-dark/50">?</span>
                    </div>
                  )}
                  <span>{entry.playerName || 'Anonymous'}</span>
                </div>
                <div className="col-span-3 font-sketch text-lg text-pencil-dark text-right">
                  {entry.score}
                </div>
              </motion.div>
            ))}
            {leaderboard.length === 0 && (
              <div className="text-center font-sketch text-xl text-pencil-dark/70 p-8">
                No scores yet! Be the first to play!
              </div>
            )}
          </div>
        </div>
      </div>
    </GameContainer>
  );
};

export default Leaderboard;