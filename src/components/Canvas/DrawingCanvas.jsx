import React, { useEffect, useRef, useState } from 'react';
import { useCanvas } from '../../hooks/useCanvas';
import { analyzeDrawing } from '../../services/bedrock/bedrockService';
import CanvasControls from './CanvasControls';
import ColorPicker from './ColorPicker';
import { useToastContext } from '../../context/ToastContext';
import { useGame } from '../../context/GameContext';

const DrawingCanvas = ({ onSubmit, currentWord }) => {
  const canvasRef = useRef(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentColor, setCurrentColor] = useState('#2B2B2B');
  const { showToast } = useToastContext();
  const { pauseTimer, resumeTimer } = useGame();
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

  const handleSubmit = async () => {
    if (!hasDrawing || isAnalyzing) {
      showToast('Please draw something first!', 'error');
      return;
    }

    setIsAnalyzing(true);
    pauseTimer();

    try {
      const imageData = canvasRef.current.toDataURL('image/png');
      const isCorrect = await analyzeDrawing(imageData, currentWord);

      if (isCorrect) {
        showToast(`Great job! That's perfect!`, 'success');
        onSubmit?.(imageData);
        handleClear(canvasRef.current);
      } else {
        showToast(
          `That doesn't quite look right. Try drawing it again!`,
          'error'
        );
        resumeTimer();
      }
    } catch (error) {
      console.error('Error submitting drawing:', error);
      showToast(
        'There was an error analyzing your drawing. Please try again.',
        'error'
      );
      resumeTimer();
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <ColorPicker currentColor={currentColor} onColorChange={setCurrentColor} />
      
      <canvas
        ref={canvasRef}
        onMouseDown={(e) => startDrawing(e, canvasRef.current)}
        onMouseMove={(e) => draw(e, canvasRef.current)}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        className="border-2 border-pencil-dark rounded-md bg-paper cursor-pencil"
        style={{
          width: '400px',
          height: '400px',
          touchAction: 'none',
        }}
      />
      
      <CanvasControls
        onClear={() => handleClear(canvasRef.current)}
        onSubmit={handleSubmit}
        isDisabled={!hasDrawing || isAnalyzing}
        isAnalyzing={isAnalyzing}
      />
    </div>
  );
};

export default DrawingCanvas;