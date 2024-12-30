import React from 'react';
import { motion } from 'framer-motion';

const WordBlocks = ({ word, revealedLetters }) => {
  return (
    <div className="flex justify-center gap-3 my-6">
      {word.split('').map((letter, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="w-12 h-12 flex items-center justify-center border-2 border-pencil-dark rounded-md bg-white"
        >
          <span className="font-sketch text-2xl">
            {revealedLetters.includes(index) ? letter : '_'}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

export default WordBlocks;