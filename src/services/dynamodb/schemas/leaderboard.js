export const LeaderboardTableSchema = {
    TableName: 'SketchItLeaderboard',
    KeySchema: [
        { AttributeName: 'timeframe', KeyType: 'HASH' },
        { AttributeName: 'score', KeyType: 'RANGE' },
    ],
    AttributeDefinitions: [
        { AttributeName: 'timeframe', AttributeType: 'S' },
        { AttributeName: 'score', AttributeType: 'N' },
        { AttributeName: 'playerId', AttributeType: 'S' },
    ],
    GlobalSecondaryIndexes: [
        {
            IndexName: 'PlayerIndex',
            KeySchema: [
                { AttributeName: 'playerId', KeyType: 'HASH' },
            ],
            Projection: { ProjectionType: 'ALL' },
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5,
            },
        },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
    },
};