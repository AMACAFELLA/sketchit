import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Toast = ({ message, type, isVisible }) => {
  if (!isVisible) return null;

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg font-sketch z-50 text-center w-auto min-w-[200px] mx-auto flex items-center justify-center`}
      >
        {message}
      </motion.div>
    </AnimatePresence>
  );
};

export default Toast;