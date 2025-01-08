import { InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';
import { bedrockClient } from './bedrockClient';
import { parseBedrockResponse } from './responseParser';
import { RateLimiter } from '../rateLimiter/RateLimiter';
import { RATE_LIMIT_CONFIG } from '../rateLimiter/config';

const rateLimiter = new RateLimiter(
    RATE_LIMIT_CONFIG.MAX_REQUESTS,
    RATE_LIMIT_CONFIG.TIME_WINDOW
);

const makeBedrockRequest = async ({ imageData, targetWord }) => {
    const base64Image = imageData.replace(/^data:image\/\w+;base64,/, '');

    const body = {
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 1000,
        messages: [
            {
                role: "user",
                content: [
                    {
                        type: "text",
                        text: `Analyze this drawing and determine if it represents a "${targetWord}". Respond with ONLY "true" if the drawing clearly shows a ${targetWord}, or "false" if it does not. Be strict in your evaluation.`
                    },
                    {
                        type: "image",
                        source: {
                            type: "base64",
                            media_type: "image/png",
                            data: base64Image
                        }
                    }
                ]
            }
        ]
    };

    return rateLimiter.execute(async () => {
        // console.log('Sending request to Bedrock...');
        try {
            const command = new InvokeModelCommand({
                modelId: "anthropic.claude-3-5-sonnet-20240620-v1:0",
                body: JSON.stringify(body),
                contentType: "application/json",
                accept: "application/json",
            });

            const response = await bedrockClient.send(command);
            return parseBedrockResponse(response);
        } catch (error) {
            if (error.name === 'ThrottlingException') {
                // Retry with exponential backoff
                await new Promise(resolve => setTimeout(resolve, 1000));
                return makeBedrockRequest({ imageData, targetWord });
            }
            throw error;
        }
    });
};

export const analyzeDrawing = async (imageData, targetWord) => {
    if (!targetWord) {
        throw new Error('Target word is required');
    }

    if (!imageData) {
        throw new Error('Image data is required');
    }

    try {
        return await makeBedrockRequest({ imageData, targetWord });
    } catch (error) {
        // console.error('Drawing analysis failed:', error);
        throw error;
    }
};