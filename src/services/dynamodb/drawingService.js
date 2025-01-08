import { DynamoDBDocumentClient, PutCommand, ScanCommand, UpdateCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { s3Service } from '../s3/s3Service';
import { docClient } from './client';
import { TABLES } from './constants';
import { playerService } from './playerService';

export const drawingService = {
    async saveDrawing(playerId, word, imageData) {
        try {
            const currentTimestamp = new Date().toISOString();

            // Get or create the player
            let player = await playerService.getPlayer(playerId);
            if (!player) {
                // Create a temporary player record if none exists
                player = await playerService.createPlayer(playerId, `Player_${playerId.slice(0, 8)}`);
            }

            // Generate the drawing ID using playerId and word
            const drawingId = `${playerId}_${word}`;

            // Upload the new image first
            const imageKey = await s3Service.uploadDrawing(playerId, word, imageData);

            // Create the drawing item
            const drawingItem = {
                id: drawingId,
                playerId,
                word,
                imageKey,
                timestamp: currentTimestamp,
                username: player.username
            };

            // Use PutCommand instead of trying to update
            await docClient.send(
                new PutCommand({
                    TableName: TABLES.DRAWINGS,
                    Item: drawingItem
                })
            );

            return imageKey;
        } catch (error) {
            // console.error('Error saving drawing:', error);
            throw error;
        }
    },

    async getGalleryDrawings(limit = 50) {
        try {
            const response = await docClient.send(new ScanCommand({
                TableName: TABLES.DRAWINGS,
                Limit: limit
            }));

            const drawings = response.Items || [];
            return Promise.all(drawings.map(async (drawing) => ({
                ...drawing,
                imageUrl: await s3Service.getSignedUrl(drawing.imageKey),
            })));
        } catch (error) {
            // console.error('Error fetching gallery drawings:', error);
            throw new Error('Failed to fetch gallery drawings');
        }
    },

    async getUserDrawings(playerId) {
        try {
            const response = await docClient.send(new ScanCommand({
                TableName: TABLES.DRAWINGS,
                FilterExpression: 'playerId = :playerId',
                ExpressionAttributeValues: {
                    ':playerId': playerId
                }
            }));

            const drawings = response.Items || [];
            return Promise.all(drawings.map(async (drawing) => ({
                ...drawing,
                imageUrl: await s3Service.getSignedUrl(drawing.imageKey),
            })));
        } catch (error) {
            // console.error('Error fetching user drawings:', error);
            throw new Error('Failed to fetch user drawings');
        }
    },
};