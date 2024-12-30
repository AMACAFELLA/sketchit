import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import { WEBSOCKET_CONFIG } from './config';
import { MULTIPLAYER_EVENTS } from './events';

class MultiplayerService {
    constructor() {
        this.socket = null;
        this.callbacks = new Map();
        this.reconnectAttempts = 0;
    }

    connect(userId) {
        if (this.socket?.connected) return;

        this.socket = io(import.meta.env.VITE_WEBSOCKET_URL || 'wss://api.sketchit.games', {
            auth: { userId },
            reconnectionAttempts: WEBSOCKET_CONFIG.RECONNECTION_ATTEMPTS,
            reconnectionDelay: WEBSOCKET_CONFIG.RECONNECTION_DELAY,
            pingTimeout: WEBSOCKET_CONFIG.PING_TIMEOUT,
            pingInterval: WEBSOCKET_CONFIG.PING_INTERVAL
        });

        this.setupEventListeners();
    }

    setupEventListeners() {
        Object.values(MULTIPLAYER_EVENTS).forEach(event => {
            this.socket.on(event, (data) => this.handleEvent(event, data));
        });

        // Handle reconnection
        this.socket.on('reconnect_attempt', () => {
            this.reconnectAttempts++;
            this.handleEvent('reconnectAttempt', { attempt: this.reconnectAttempts });
        });

        this.socket.on('reconnect', () => {
            this.reconnectAttempts = 0;
            this.handleEvent('reconnect', null);
        });
    }

    handleEvent(event, data) {
        const callback = this.callbacks.get(event);
        if (callback) callback(data);
    }

    on(event, callback) {
        this.callbacks.set(event, callback);
    }

    off(event) {
        this.callbacks.delete(event);
    }

    async createGame(gameMode = 'classic') {
        const gameId = uuidv4();
        await this.emit('createGame', { gameId, gameMode });
        return gameId;
    }

    async joinGame(gameId) {
        await this.emit('joinGame', { gameId });
    }

    async leaveGame(gameId) {
        await this.emit('leaveGame', { gameId });
    }

    async submitDrawing(gameId, drawingData) {
        await this.emit('submitDrawing', { gameId, ...drawingData });
    }

    async emit(event, data) {
        return new Promise((resolve, reject) => {
            if (!this.socket?.connected) {
                reject(new Error('Not connected to server'));
                return;
            }

            this.socket.emit(event, data, (response) => {
                if (response?.error) {
                    reject(new Error(response.error));
                } else {
                    resolve(response);
                }
            });
        });
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
            this.callbacks.clear();
            this.reconnectAttempts = 0;
        }
    }
}

export const multiplayerService = new MultiplayerService();