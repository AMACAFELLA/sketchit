// Bedrock has a limit of 1 request per second per account
export const RATE_LIMIT_CONFIG = {
    MAX_REQUESTS: 1,
    TIME_WINDOW: 1500, // 1.5 seconds to be safe
};