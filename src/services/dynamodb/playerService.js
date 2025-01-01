import { DynamoDBDocumentClient, PutCommand, GetCommand, QueryCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { docClient } from './client';
import { TABLES } from './constants';

export const playerService = {
    async createPlayer(userId, username) {
        const player = {
            id: userId,
            username,
            createdAt: new Date().toISOString(),
            stats: {
                gamesPlayed: 0,
                totalScore: 0,
                highScore: 0,
                correctDrawings: 0,
            },
            customization: {
                pencilColor: '#2B2B2B',
                profilePicture: null
            }
        };

        await docClient.send(
            new PutCommand({
                TableName: TABLES.PLAYERS,
                Item: player,
            })
        );

        return player;
    },

    async getPlayer(userId) {
        const response = await docClient.send(
            new GetCommand({
                TableName: TABLES.PLAYERS,
                Key: { id: userId },
            })
        );
        return response.Item;
    },

    async updatePlayerStats(userId, gameStats) {
        const player = await this.getPlayer(userId);
        const currentHighScore = player?.stats?.highScore || 0;

        // Only update if we have valid stats
        if (!gameStats || typeof gameStats.score !== 'number') {
            throw new Error('Invalid game stats provided');
        }

        const response = await docClient.send(
            new UpdateCommand({
                TableName: TABLES.PLAYERS,
                Key: { id: userId },
                UpdateExpression: 'SET stats = :stats',
                ExpressionAttributeValues: {
                    ':stats': {
                        gamesPlayed: (player?.stats?.gamesPlayed || 0) + 1,
                        totalScore: (player?.stats?.totalScore || 0) + gameStats.score,
                        highScore: Math.max(gameStats.score, currentHighScore),
                        correctDrawings: (player?.stats?.correctDrawings || 0) + gameStats.correctDrawings
                    }
                },
                ReturnValues: 'ALL_NEW',
            })
        );
        return response.Attributes;
    },

    async updateCustomization(userId, customization) {
        const response = await docClient.send(
            new UpdateCommand({
                TableName: TABLES.PLAYERS,
                Key: { id: userId },
                UpdateExpression: 'SET customization = :customization',
                ExpressionAttributeValues: {
                    ':customization': customization,
                },
                ReturnValues: 'ALL_NEW',
            })
        );
        return response.Attributes;
    },

    async getLeaderboard() {
        // First get the leaderboard entries
        const leaderboardResponse = await docClient.send(
            new QueryCommand({
                TableName: TABLES.LEADERBOARD,
                KeyConditionExpression: 'timeframe = :timeframe',
                ExpressionAttributeValues: {
                    ':timeframe': 'all'
                },
                ScanIndexForward: false,
                Limit: 100,
            })
        );

        const entries = leaderboardResponse.Items || [];

        // Then fetch player details for each entry
        const enrichedEntries = await Promise.all(
            entries.map(async (entry) => {
                try {
                    const player = await this.getPlayer(entry.playerId);
                    return {
                        ...entry,
                        customization: player?.customization || null
                    };
                } catch (error) {
                    console.error(`Failed to fetch player details for ${entry.playerId}:`, error);
                    return entry;
                }
            })
        );

        return enrichedEntries;
    },

    async updateLeaderboard(userId, score) {
        const player = await this.getPlayer(userId);

        // First, query the existing score for this player
        const existingScore = await docClient.send(
            new QueryCommand({
                TableName: TABLES.LEADERBOARD,
                IndexName: 'PlayerIndex',
                KeyConditionExpression: 'playerId = :playerId',
                ExpressionAttributeValues: {
                    ':playerId': userId
                }
            })
        );

        const currentHighScore = existingScore.Items?.[0]?.score ?? 0;

        // Only update if the new score is higher
        if (score > currentHighScore) {
            await docClient.send(
                new PutCommand({
                    TableName: TABLES.LEADERBOARD,
                    Item: {
                        timeframe: 'all',
                        score,
                        playerId: userId,
                        playerName: player.username,
                        timestamp: new Date().toISOString()
                    },
                })
            );
        }
    }
};