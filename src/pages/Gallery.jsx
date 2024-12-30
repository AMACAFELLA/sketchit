import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { drawingService } from '../services/dynamodb/drawingService';
import GameContainer from '../components/Layout/GameContainer';

const Gallery = () => {
    const [drawings, setDrawings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDrawings = async () => {
            try {
                const galleryDrawings = await drawingService.getGalleryDrawings();
                setDrawings(galleryDrawings);
            } catch (error) {
                console.error('Failed to fetch drawings:', error);
                setError('Failed to load gallery');
            } finally {
                setLoading(false);
            }
        };

        fetchDrawings();
    }, []);

    if (loading) return <div className="text-center font-sketch text-xl">Loading...</div>;
    if (error) return <div className="text-center font-sketch text-xl text-red-500">Error: {error}</div>;

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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {drawings.map((drawing) => (
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

                {drawings.length === 0 && (
                    <div className="text-center font-sketch text-xl text-pencil-dark/70">
                        No drawings yet! Be the first to contribute!
                    </div>
                )}
            </div>
        </GameContainer>
    );
};

export default Gallery;