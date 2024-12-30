import React from 'react';
import { motion } from 'framer-motion';

const CanvasControls = ({ onClear, onSubmit, isDisabled, isAnalyzing }) => {
  return (
    <div className="flex gap-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClear}
        className="sketch-button"
      >
        Clear
      </motion.button>
      <motion.button
        whileHover={!isDisabled ? { scale: 1.05 } : {}}
        whileTap={!isDisabled ? { scale: 0.95 } : {}}
        onClick={onSubmit}
        disabled={isDisabled}
        className={`sketch-button ${
          isDisabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isAnalyzing ? 'Analyzing...' : 'Submit Drawing'}
      </motion.button>
    </div>
  );
};

export default CanvasControls;