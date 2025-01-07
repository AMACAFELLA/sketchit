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

const ColorPicker = ({ currentColor, onColorChange, disabled }) => {
  const handleColorChange = (color) => {
    if (!disabled) {
      onColorChange(color);
    }
  };

  return (
    <div className={`flex items-center gap-2 mb-4 ${disabled ? 'opacity-50' : ''}`}>
      {colors.map((color) => (
        <motion.button
          key={color}
          whileHover={disabled ? {} : { scale: 1.1 }}
          whileTap={disabled ? {} : { scale: 0.9 }}
          onClick={() => handleColorChange(color)}
          className={`w-8 h-8 rounded-full border-2 ${
            currentColor === color ? 'border-pencil-dark' : 'border-transparent'
          } ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          style={{ backgroundColor: color }}
          disabled={disabled}
        />
      ))}
      <input
        type="color"
        value={currentColor}
        onChange={(e) => handleColorChange(e.target.value)}
        className={`w-8 h-8 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        disabled={disabled}
      />
    </div>
  );
};

export default ColorPicker;