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
        try {
            // Get leaderboard entries sorted by score (descending)
            const leaderboardResponse = await docClient.send(
                new QueryCommand({
                    TableName: TABLES.LEADERBOARD,
                    KeyConditionExpression: 'timeframe = :timeframe',
                    ExpressionAttributeValues: {
                        ':timeframe': 'all'
                    },
                    ScanIndexForward: false, // Get highest scores first
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
                            playerName: entry.playerName || player?.username || 'Anonymous',
                            customization: player?.customization || null
                        };
                    } catch (error) {
                        console.error(`Failed to fetch player details for ${entry.playerId}:`, error);
                        return {
                            ...entry,
                            playerName: entry.playerName || 'Anonymous',
                            customization: null
                        };
                    }
                })
            );

            // Sort by score in descending order
            return enrichedEntries.sort((a, b) => b.score - a.score);
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
            return [];
        }
    },

    async updateLeaderboard(userId, score) {
        try {
            const player = await this.getPlayer(userId);
            if (!player) {
                console.error('Player not found:', userId);
                return;
            }

            // First, query to see if the player already has a leaderboard entry
            const existingEntry = await docClient.send(
                new QueryCommand({
                    TableName: TABLES.LEADERBOARD,
                    IndexName: 'PlayerIndex',
                    KeyConditionExpression: 'playerId = :playerId',
                    ExpressionAttributeValues: {
                        ':playerId': userId
                    }
                })
            );

            const timestamp = new Date().toISOString();

            if (existingEntry.Items && existingEntry.Items.length > 0) {
                // Update existing entry if new score is higher
                const currentScore = existingEntry.Items[0].score;
                if (score > currentScore) {
                    await docClient.send(
                        new UpdateCommand({
                            TableName: TABLES.LEADERBOARD,
                            Key: {
                                timeframe: 'all',
                                score: currentScore
                            },
                            UpdateExpression: 'SET score = :newScore, playerName = :playerName, timestamp = :timestamp',
                            ExpressionAttributeValues: {
                                ':newScore': score,
                                ':playerName': player.username || 'Anonymous',
                                ':timestamp': timestamp
                            }
                        })
                    );
                    console.log('Updated existing leaderboard entry for player:', userId, 'New score:', score);
                } else {
                    console.log('Current score not higher than existing score:', currentScore);
                }
            } else {
                // Create new entry if player doesn't have one
                await docClient.send(
                    new PutCommand({
                        TableName: TABLES.LEADERBOARD,
                        Item: {
                            timeframe: 'all',
                            score: score,
                            playerId: userId,
                            playerName: player.username || 'Anonymous',
                            timestamp: timestamp
                        },
                    })
                );
                console.log('Created new leaderboard entry for player:', userId, 'with score:', score);
            }
        } catch (error) {
            console.error('Error updating leaderboard:', error);
            throw error;
        }
    }
};