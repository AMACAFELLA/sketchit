import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
    const navigate = useNavigate();
    const { signOut } = useAuth();

    const handleStartGame = () => {
        navigate('/game', { state: { fromHome: true } });
    };

    return (
        <div className="min-h-screen bg-paper flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
            >
                <h1 className="font-sketch text-6xl text-pencil-dark mb-8">
                    Sketch It!
                </h1>
                <p className="font-sketch text-xl text-pencil-dark mb-8">
                    Draw and guess words in this fun sketching game!
                </p>
                <div className="flex flex-col gap-4 items-center">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleStartGame}
                        className="sketch-button text-xl px-8 py-3 w-48"
                    >
                        Single Player
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/gallery')}
                        className="sketch-button text-xl px-8 py-3 w-48"
                    >
                        Gallery
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/profile')}
                        className="sketch-button text-xl px-8 py-3 w-48"
                    >
                        Profile
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/leaderboard')}
                        className="sketch-button text-xl px-8 py-3 w-48"
                    >
                        Leaderboard
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={signOut}
                        className="sketch-button text-xl px-8 py-3 w-48"
                    >
                        Sign Out
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default Home;