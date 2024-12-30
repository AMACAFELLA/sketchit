import React from 'react';
import { motion } from 'framer-motion';

const SketchButton = ({ children, onClick, className = '' }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        font-sketch py-2 px-6 
        relative overflow-hidden
        text-pencil-dark
        before:absolute before:inset-0 
        before:border-2 before:border-pencil-dark
        before:rounded-md before:transform before:rotate-[-0.5deg]
        after:absolute after:inset-0 
        after:border-2 after:border-pencil-dark
        after:rounded-md after:transform after:rotate-[0.5deg]
        hover:shadow-sketch transition-shadow
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
};

export default SketchButton;
