import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { playerService } from '../services/dynamodb/playerService';
import GameContainer from '../components/Layout/GameContainer';
import ProfilePicture from '../components/Profile/ProfilePicture';

const ITEMS_PER_PAGE = 10;

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

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

  const totalPages = Math.ceil(leaderboard.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentEntries = leaderboard.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <div className="text-center font-sketch text-xl">Loading...</div>;
  if (error) return <div className="text-center font-sketch text-xl text-red-500">Error: {error}</div>;

  return (
    <GameContainer>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="font-sketch text-5xl text-pencil-dark mb-4">
            Leaderboard
          </h1>
        </motion.div>

        <div className="bg-white rounded-lg shadow-sketch overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-12 gap-4 p-6 border-b border-pencil-dark/10 bg-paper">
            <div className="col-span-2 font-sketch text-xl text-pencil-dark">Rank</div>
            <div className="col-span-7 font-sketch text-xl text-pencil-dark flex items-center">Player</div>
            <div className="col-span-3 font-sketch text-xl text-pencil-dark text-right">Score</div>
          </div>

          {/* Leaderboard entries */}
          <div className="divide-y divide-pencil-dark/10">
            {currentEntries.map((entry, index) => (
              <motion.div
                key={`${entry.playerId}-${entry.timestamp}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="grid grid-cols-12 gap-4 p-6 items-center hover:bg-paper/50 transition-colors"
              >
                <div className="col-span-2 font-sketch text-2xl text-pencil-dark">
                  #{startIndex + index + 1}
                </div>
                <div className="col-span-7 font-sketch text-xl text-pencil-dark flex items-center gap-4">
                  {entry.customization?.profilePicture ? (
                    <ProfilePicture
                      imageKey={entry.customization.profilePicture}
                      className="w-12 h-12 rounded-full border-2 border-pencil-dark object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full border-2 border-pencil-dark bg-paper flex items-center justify-center">
                      <span className="font-sketch text-lg text-pencil-dark/50">?</span>
                    </div>
                  )}
                  <span>{entry.playerName || 'Anonymous'}</span>
                </div>
                <div className="col-span-3 font-sketch text-xl text-pencil-dark text-right">
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 p-6 bg-paper border-t border-pencil-dark/10">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`sketch-button px-4 py-2 ${
                  currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-paper/80 active:bg-paper/60'
                }`}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`sketch-button px-4 py-2 ${
                    currentPage === page
                      ? 'bg-pencil-dark text-paper'
                      : 'hover:bg-paper/80 active:bg-paper/60'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`sketch-button px-4 py-2 ${
                  currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-paper/80 active:bg-paper/60'
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </GameContainer>
  );
};

export default Leaderboard;