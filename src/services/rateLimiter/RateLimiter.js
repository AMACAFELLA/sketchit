export class RateLimiter {
    constructor(maxRequests, timeWindow) {
        this.maxRequests = maxRequests;
        this.timeWindow = timeWindow; // in milliseconds
        this.requests = [];
        this.queue = [];
        this.processing = false;
    }

    async execute(fn) {
        const now = Date.now();

        // Clean up old requests outside the time window
        this.requests = this.requests.filter(
            timestamp => now - timestamp < this.timeWindow
        );

        // If we're under the limit, execute immediately
        if (this.requests.length < this.maxRequests) {
            this.requests.push(now);
            return fn();
        }

        // Calculate wait time until next available slot
        const oldestRequest = this.requests[0];
        const waitTime = oldestRequest + this.timeWindow - now;

        // Wait until we can make another request
        await new Promise(resolve => setTimeout(resolve, waitTime));

        // Remove the oldest request and add the new one
        this.requests.shift();
        this.requests.push(now);

        return fn();
    }
}