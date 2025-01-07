import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HowToPlay = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-paper flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl w-full text-center"
            >
                <h1 className="font-sketch text-5xl text-pencil-dark mb-8">
                    How to Play
                </h1>
                <div className="bg-white rounded-lg p-6 shadow-md mb-6">
                    <div className="text-left space-y-4">
                        <h2 className="font-sketch text-2xl text-pencil-dark">Game Rules:</h2>
                        <ol className="list-decimal list-inside space-y-3 font-sketch text-lg text-pencil-dark">
                            <li>You'll be presented with a hidden word, shown as blocks indicating its length</li>
                            <li>Each word belongs to a specific category to help guide your drawing</li>
                            <li>Draw your interpretation of what you think the word might be</li>
                            <li>Amazon Bedrock's AI will analyze your drawing to see if it matches the word</li>
                            <li>Successful matches earn you points based on difficulty:
                                <ul className="list-disc list-inside ml-6 mt-2">
                                    <li>Easy: 10 points</li>
                                    <li>Medium: 15 points</li>
                                    <li>Hard: 20 points</li>
                                    <li>Expert: 30 points</li>
                                </ul>
                            </li>
                            <li>Your successful drawings will be added to the gallery</li>
                        </ol>
                        
                        <h2 className="font-sketch text-2xl text-pencil-dark mt-6">Word Reveals:</h2>
                        <ul className="list-disc list-inside space-y-3 font-sketch text-lg text-pencil-dark">
                            <li>You start with 30 hint points</li>
                            <li>You get three free letter reveals (10 hint points each)</li>
                            <li>After using your free reveals, each additional letter reveal costs 10 score points</li>
                            <li>Choose wisely when to use your reveals!</li>
                        </ul>

                        <h2 className="font-sketch text-2xl text-pencil-dark mt-6">Tips:</h2>
                        <ul className="list-disc list-inside space-y-3 font-sketch text-lg text-pencil-dark">
                            <li>Pay attention to the category - it's your best hint!</li>
                            <li>Draw clear, recognizable shapes</li>
                            <li>Use your free reveals strategically on harder words</li>
                            <li>The difficulty increases as you score more points:
                                <ul className="list-disc list-inside ml-6 mt-2">
                                    <li>0-29 points: Easy</li>
                                    <li>30-59 points: Medium</li>
                                    <li>60-99 points: Hard</li>
                                    <li>100+ points: Expert</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/')}
                    className="sketch-button text-xl px-8 py-3"
                >
                    Back to Home
                </motion.button>
            </motion.div>
        </div>
    );
};

export default HowToPlay;
