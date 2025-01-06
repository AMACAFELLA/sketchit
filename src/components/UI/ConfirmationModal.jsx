import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-paper rounded-lg p-6 shadow-sketch max-w-md w-full mx-4 relative z-10"
        >
          <h2 className="font-sketch text-2xl text-pencil-dark mb-4">{title}</h2>
          <p className="font-sketch text-lg text-pencil-dark/80 mb-6">{message}</p>
          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="sketch-button hover:bg-paper/80 active:bg-paper/60 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="sketch-button bg-red-500 text-white hover:bg-red-600 active:bg-red-700 transition-colors"
            >
              Leave Game
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ConfirmationModal;
