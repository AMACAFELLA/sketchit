import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProfilePictureEditor from './ProfilePictureEditor';

const DrawingEditor = ({ onSave, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-paper p-8 rounded-lg max-w-xl w-full"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-sketch text-2xl text-pencil-dark">Draw Your Profile Picture</h3>
            <button 
              onClick={onClose}
              className="text-pencil-dark/50 hover:text-pencil-dark"
            >
              ✕
            </button>
          </div>
          
          <ProfilePictureEditor onSave={onSave} />
          
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={onClose}
              className="sketch-button"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DrawingEditor;