import { useState, useCallback } from 'react';

export const useDrawing = () => {
    const [drawingHistory, setDrawingHistory] = useState([]);
    const [currentPath, setCurrentPath] = useState([]);

    const startDrawing = useCallback((point) => {
        setCurrentPath([point]);
    }, []);

    const draw = useCallback((point) => {
        setCurrentPath(prev => [...prev, point]);
    }, []);

    const endDrawing = useCallback(() => {
        setDrawingHistory(prev => [...prev, currentPath]);
        setCurrentPath([]);
    }, [currentPath]);

    const undo = useCallback(() => {
        setDrawingHistory(prev => prev.slice(0, -1));
    }, []);

    const clear = useCallback(() => {
        setDrawingHistory([]);
        setCurrentPath([]);
    }, []);

    return {
        drawingHistory,
        currentPath,
        startDrawing,
        draw,
        endDrawing,
        undo,
        clear
    };
};

export default useDrawing;
