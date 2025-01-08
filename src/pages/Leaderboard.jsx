import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { playerService } from '../services/dynamodb/playerService';
import GameContainer from '../components/Layout/GameContainer';
import ProfilePicture from '../components/Profile/ProfilePicture';
import { useAuth } from '../context/AuthContext';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const ITEMS_PER_PAGE_OPTIONS = [10, 25, 50];

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[0]);
  const [pageLoading, setPageLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await playerService.getLeaderboard();
        setLeaderboard(data);
      } catch (error) {
        // console.error('Failed to fetch leaderboard:', error);
        setError('Failed to load leaderboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const totalPages = Math.ceil(leaderboard.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEntries = leaderboard.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setPageLoading(true);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Simulate a small delay to show loading state
    setTimeout(() => setPageLoading(false), 300);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(Number(newItemsPerPage));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
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
          <p className="font-sketch text-xl text-pencil-dark/70">
            All-time best scores from our amazing artists!
          </p>
        </motion.div>

        <div className="bg-white rounded-lg shadow-sketch overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-12 gap-4 p-6 border-b border-pencil-dark/10 bg-paper">
            <div className="col-span-1 font-sketch text-xl text-pencil-dark">Rank</div>
            <div className="col-span-4 font-sketch text-xl text-pencil-dark">Player</div>
            <div className="col-span-2 font-sketch text-xl text-pencil-dark text-right">Score</div>
            <div className="col-span-3 font-sketch text-xl text-pencil-dark text-right">Date</div>
          </div>

          {/* Leaderboard entries */}
          <div className="divide-y divide-pencil-dark/10 relative">
            {pageLoading && (
              <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
                <div className="font-sketch text-xl text-pencil-dark">Loading...</div>
              </div>
            )}
            {currentEntries.map((entry, index) => {
              const isCurrentUser = user && entry.playerId === user.userId;
              return (
                <motion.div
                  key={entry.scoreId || `${entry.playerId}-${entry.timestamp}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`grid grid-cols-12 gap-4 p-6 items-center hover:bg-paper/50 transition-colors ${
                    isCurrentUser ? 'bg-yellow-50' : ''
                  }`}
                >
                  <div className="col-span-1 font-sketch text-2xl text-pencil-dark">
                    #{startIndex + index + 1}
                  </div>
                  <div className="col-span-4 font-sketch text-xl text-pencil-dark flex items-center gap-4">
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
                    <span className={isCurrentUser ? 'font-bold' : ''}>
                      {entry.playerName}
                      {isCurrentUser && ' (You)'}
                    </span>
                  </div>
                  <div className="col-span-2 font-sketch text-xl text-pencil-dark text-right">
                    {entry.score}
                  </div>
                  <div className="col-span-3 font-sketch text-xl text-pencil-dark text-right">
                    {formatDate(entry.timestamp)}
                  </div>
                </motion.div>
              );
            })}
            {leaderboard.length === 0 && (
              <div className="text-center font-sketch text-xl text-pencil-dark/70 p-8">
                No scores yet! Be the first to play!
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col items-center gap-4 p-4 bg-paper">
              <div className="font-sketch text-lg text-pencil-dark">
                Showing {startIndex + 1}-{Math.min(endIndex, leaderboard.length)} of {leaderboard.length} entries
              </div>
              <div className="flex justify-center items-center gap-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`sketch-button p-2 ${
                    currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <ChevronLeftIcon className="w-6 h-6" />
                </button>
                <span className="font-sketch text-xl">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`sketch-button p-2 ${
                    currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <ChevronRightIcon className="w-6 h-6" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </GameContainer>
  );
};

export default Leaderboard;