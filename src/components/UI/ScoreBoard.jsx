import React from 'react';
import { motion } from 'framer-motion';

const ScoreBoard = ({ score, foundWords }) => {
  return (
    <div className="bg-white/50 rounded-lg p-6 shadow-sketch">
      <h2 className="font-sketch text-2xl text-pencil-dark mb-4">Score: {score}</h2>
      {foundWords && foundWords.length > 0 && (
        <div>
          <h3 className="font-sketch text-xl text-pencil-dark mb-2">Found Words:</h3>
          <ul className="space-y-2">
            {Array.from(foundWords).map((word, index) => (
              <motion.li
                key={word}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="font-sketch text-lg text-pencil-dark"
              >
                {word}
              </motion.li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ScoreBoard;