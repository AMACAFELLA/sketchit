import React from 'react';
import { motion } from 'framer-motion';

const colors = [
  '#2B2B2B', // Default black
  '#FF0000', // Red
  '#00FF00', // Green
  '#0000FF', // Blue
  '#FFA500', // Orange
  '#800080', // Purple
];

const ColorPicker = ({ currentColor, onColorChange }) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      {colors.map((color) => (
        <motion.button
          key={color}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onColorChange(color)}
          className={`w-8 h-8 rounded-full border-2 ${
            currentColor === color ? 'border-pencil-dark' : 'border-transparent'
          }`}
          style={{ backgroundColor: color }}
        />
      ))}
      <input
        type="color"
        value={currentColor}
        onChange={(e) => onColorChange(e.target.value)}
        className="w-8 h-8 cursor-pointer"
      />
    </div>
  );
};

export default ColorPicker;