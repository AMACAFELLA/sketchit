export const DrawingsTableSchema = {
    TableName: 'SketchItDrawings',
    KeySchema: [
        { AttributeName: 'id', KeyType: 'HASH' },
    ],
    AttributeDefinitions: [
        { AttributeName: 'id', AttributeType: 'S' },
        { AttributeName: 'userId', AttributeType: 'S' },
        { AttributeName: 'createdAt', AttributeType: 'S' },
    ],
    GlobalSecondaryIndexes: [
        {
            IndexName: 'UserDrawingsIndex',
            KeySchema: [
                { AttributeName: 'userId', KeyType: 'HASH' },
                { AttributeName: 'createdAt', KeyType: 'RANGE' },
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