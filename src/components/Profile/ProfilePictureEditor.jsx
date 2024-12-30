import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ColorPicker from '../Canvas/ColorPicker';
import { useCanvas } from '../../hooks/useCanvas';

const ProfilePictureEditor = ({ onSave }) => {
  const canvasRef = useRef(null);
  const [currentColor, setCurrentColor] = useState('#2B2B2B');
  const {
    hasDrawing,
    initializeCanvas,
    startDrawing,
    draw,
    stopDrawing,
    handleClear,
    setStrokeStyle
  } = useCanvas();

  useEffect(() => {
    if (canvasRef.current) {
      initializeCanvas(canvasRef.current);
    }
  }, [initializeCanvas]);

  useEffect(() => {
    setStrokeStyle(currentColor);
  }, [currentColor, setStrokeStyle]);

  const handleSave = () => {
    if (!hasDrawing) return;
    const imageData = canvasRef.current.toDataURL('image/png');
    onSave(imageData);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <ColorPicker currentColor={currentColor} onColorChange={setCurrentColor} />
      
      <canvas
        ref={canvasRef}
        width={200}
        height={200}
        onMouseDown={(e) => startDrawing(e, canvasRef.current)}
        onMouseMove={(e) => draw(e, canvasRef.current)}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        className="border-2 border-pencil-dark rounded-full bg-paper cursor-pencil"
      />

      <div className="flex gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleClear(canvasRef.current)}
          className="sketch-button"
        >
          Clear
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSave}
          disabled={!hasDrawing}
          className={`sketch-button ${!hasDrawing ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Save Profile Picture
        </motion.button>
      </div>
    </div>
  );
};

export default ProfilePictureEditor;