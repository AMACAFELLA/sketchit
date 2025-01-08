import { useState, useCallback } from 'react';
import { drawLine, clearCanvas } from '../utils/drawingUtils';
import { analyzeDrawing } from '../services/bedrock/bedrockService';
import { useToast } from './useToast';

export const useDrawingHandlers = ({
    canvasRef,
    contextRef,
    currentWord,
    onSubmit,
    setIsAnalyzing,
}) => {
    const [isDrawing, setIsDrawing] = useState(false);
    const [hasDrawing, setHasDrawing] = useState(false);
    const [lastPoint, setLastPoint] = useState(null);
    const { showToast } = useToast();

    const getCoordinates = useCallback(
        (event) => {
            const canvas = canvasRef.current;
            const rect = canvas.getBoundingClientRect();
            return {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top,
            };
        },
        [canvasRef]
    );

    const handleStartDrawing = useCallback(
        (event) => {
            event.preventDefault();
            const coordinates = getCoordinates(event);
            contextRef.current.beginPath();
            contextRef.current.moveTo(coordinates.x, coordinates.y);
            setIsDrawing(true);
            setLastPoint(coordinates);
            setHasDrawing(true);
        },
        [getCoordinates]
    );

    const handleDraw = useCallback(
        (event) => {
            if (!isDrawing) return;

            event.preventDefault();
            const newPoint = getCoordinates(event);

            if (lastPoint) {
                drawLine(contextRef.current, lastPoint, newPoint);
            }

            setLastPoint(newPoint);
        },
        [isDrawing, lastPoint, getCoordinates]
    );

    const handleStopDrawing = useCallback(() => {
        if (!isDrawing) return;
        contextRef.current.closePath();
        setIsDrawing(false);
        setLastPoint(null);
    }, [isDrawing]);

    const handleClear = useCallback(() => {
        clearCanvas(contextRef.current, canvasRef.current);
        setHasDrawing(false);
    }, [canvasRef]);

    const handleSubmit = useCallback(async () => {
        if (!hasDrawing || !currentWord) {
            showToast('Please draw something first!', 'error');
            return;
        }

        setIsAnalyzing(true);
        try {
            const imageData = canvasRef.current.toDataURL('image/png');
            const isCorrect = await analyzeDrawing(imageData, currentWord);

            if (isCorrect) {
                showToast('Great drawing! Keep it up!', 'success');
                onSubmit?.(imageData);
                handleClear();
            } else {
                showToast("Not quite what we're looking for. Try again!", 'error');
            }
        } catch (error) {
            // console.error('Error analyzing drawing:', error);
            showToast('Unable to analyze drawing. Please try again.', 'error');
        } finally {
            setIsAnalyzing(false);
        }
    }, [hasDrawing, currentWord, canvasRef, handleClear, onSubmit, showToast]);

    return {
        isDrawing,
        hasDrawing,
        handleStartDrawing,
        handleDraw,
        handleStopDrawing,
        handleClear,
        handleSubmit,
    };
};