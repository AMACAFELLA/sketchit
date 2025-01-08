import { useCallback } from 'react';
import { analyzeDrawing } from '../services/bedrock/bedrockService';

export const useBedrock = () => {
    const analyzeImage = useCallback(async (imageData, targetWord) => {
        try {
            const result = await analyzeDrawing(imageData, targetWord);
            return result;
        } catch (error) {
            // console.error('Error in Bedrock analysis:', error);
            throw error;
        }
    }, []);

    return { analyzeImage };
};

export default useBedrock;
