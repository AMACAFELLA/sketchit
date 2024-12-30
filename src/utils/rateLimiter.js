// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 50; // Maximum requests per minute
let requestCount = 0;
let windowStart = Date.now();

// Request queue
const requestQueue = [];
let isProcessing = false;

const processQueue = async () => {
    if (isProcessing || requestQueue.length === 0) return;
    isProcessing = true;

    try {
        while (requestQueue.length > 0) {
            const currentTime = Date.now();
            if (currentTime - windowStart >= RATE_LIMIT_WINDOW) {
                requestCount = 0;
                windowStart = currentTime;
            }

            if (requestCount >= MAX_REQUESTS_PER_WINDOW) {
                await new Promise(resolve =>
                    setTimeout(resolve, windowStart + RATE_LIMIT_WINDOW - currentTime)
                );
                continue;
            }

            const { resolve, reject, callback } = requestQueue.shift();
            try {
                requestCount++;
                const result = await callback();
                resolve(result);
            } catch (error) {
                reject(error);
            }
        }
    } finally {
        isProcessing = false;
    }
};

export const rateLimit = (callback) => {
    return new Promise((resolve, reject) => {
        requestQueue.push({ resolve, reject, callback });
        processQueue();
    });
};