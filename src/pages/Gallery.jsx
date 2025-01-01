import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { drawingService } from '../services/dynamodb/drawingService';
import GameContainer from '../components/Layout/GameContainer';

const Gallery = () => {
  const { user } = useAuth();
  const [drawings, setDrawings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchDrawings = async () => {
      try {
        const galleryDrawings = await drawingService.getGalleryDrawings();
        setDrawings(galleryDrawings);
      } catch (error) {
        console.error('Failed to fetch drawings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrawings();
  }, [user]);

  // Calculate pagination
  const totalPages = Math.ceil(drawings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDrawings = drawings.slice(startIndex, endIndex);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  if (loading) return <div className="text-center font-sketch text-xl">Loading...</div>;

  return (
    <GameContainer>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="font-sketch text-4xl text-pencil-dark mb-4">Drawing Gallery</h1>
        </motion.div>

        {drawings.length === 0 ? (
          <div className="text-center font-sketch text-xl text-pencil-dark/70">
            No drawings yet! Be the first to contribute!
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {currentDrawings.map((drawing) => (
                <div key={drawing.id} className="border rounded-lg p-4 bg-paper shadow-md">
                  <img 
                    src={drawing.imageUrl} 
                    alt={`${drawing.word} by ${drawing.username}`} 
                    className="w-full h-48 object-contain mb-2"
                  />
                  <div className="text-center">
                    <p className="font-sketch text-xl text-pencil-dark">
                      {drawing.word}
                    </p>
                    <p className="font-sketch text-sm text-pencil-light">
                      by {drawing.username || 'Unknown Artist'}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={prevPage}
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
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`sketch-button p-2 ${
                  currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <ChevronRightIcon className="w-6 h-6" />
              </button>
            </div>
          </>
        )}
      </div>
    </GameContainer>
  );
};

export default Gallery;