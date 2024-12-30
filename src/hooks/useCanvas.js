import { useState, useCallback, useRef } from 'react';
import { drawLine, clearCanvas } from '../utils/drawingUtils';

export const useCanvas = () => {
    const [isDrawing, setIsDrawing] = useState(false);
    const [lastPoint, setLastPoint] = useState(null);
    const [hasDrawing, setHasDrawing] = useState(false);
    const contextRef = useRef(null);

    const setStrokeStyle = useCallback((color) => {
        if (contextRef.current) {
            contextRef.current.strokeStyle = color;
        }
    }, []);

    const initializeCanvas = useCallback((canvas) => {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;

        const context = canvas.getContext('2d');
        context.lineCap = 'round';
        context.strokeStyle = '#2B2B2B';
        context.lineWidth = 2;
        contextRef.current = context;

        clearCanvas(context, canvas);
    }, []);

    const getCoordinates = useCallback((event, canvas) => {
        const rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }, []);

    const startDrawing = useCallback((event, canvas) => {
        event.preventDefault();
        const coordinates = getCoordinates(event, canvas);
        contextRef.current.beginPath();
        contextRef.current.moveTo(coordinates.x, coordinates.y);
        setIsDrawing(true);
        setLastPoint(coordinates);
        setHasDrawing(true);
    }, [getCoordinates]);

    const draw = useCallback((event, canvas) => {
        if (!isDrawing) return;

        event.preventDefault();
        const newPoint = getCoordinates(event, canvas);

        if (lastPoint) {
            drawLine(contextRef.current, lastPoint, newPoint);
        }

        setLastPoint(newPoint);
    }, [isDrawing, lastPoint, getCoordinates]);

    const stopDrawing = useCallback(() => {
        if (!isDrawing) return;
        contextRef.current.closePath();
        setIsDrawing(false);
        setLastPoint(null);
    }, [isDrawing]);

    const handleClear = useCallback((canvas) => {
        clearCanvas(contextRef.current, canvas);
        setHasDrawing(false);
    }, []);

    return {
        isDrawing,
        hasDrawing,
        initializeCanvas,
        startDrawing,
        draw,
        stopDrawing,
        handleClear,
        setStrokeStyle
    };
};