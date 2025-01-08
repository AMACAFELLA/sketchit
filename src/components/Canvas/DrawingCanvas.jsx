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
      // console.error('Error submitting drawing:', error);
      showToast(
        'There was an error analyzing your drawing. Please try again.',
        'error'
      );
      resumeTimer();
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleStartDrawing = (e) => {
    if (!isAnalyzing) {
      startDrawing(e, canvasRef.current);
    }
  };

  const handleDraw = (e) => {
    if (!isAnalyzing) {
      draw(e, canvasRef.current);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <ColorPicker 
        currentColor={currentColor} 
        onColorChange={setCurrentColor}
        disabled={isAnalyzing}
      />
      
      <div className="relative">
        <canvas
          ref={canvasRef}
          onMouseDown={handleStartDrawing}
          onMouseMove={handleDraw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className={`border-2 border-pencil-dark rounded-md bg-paper ${isAnalyzing ? 'cursor-not-allowed opacity-50' : 'cursor-pencil'}`}
          style={{
            width: '400px',
            height: '400px',
            touchAction: 'none',
          }}
        />
        {isAnalyzing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-md">
            <div className="sketch-loading"></div>
          </div>
        )}
      </div>
      
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