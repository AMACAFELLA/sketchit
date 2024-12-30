export const MULTIPLAYER_EVENTS = {
    // Connection events
    CONNECT: 'connect',
    DISCONNECT: 'disconnect',
    RECONNECT: 'reconnect',

    // Game events
    GAME_START: 'gameStart',
    GAME_END: 'gameEnd',
    ROUND_START: 'roundStart',
    ROUND_END: 'roundEnd',

    // Player events
    PLAYER_JOIN: 'playerJoined',
    PLAYER_LEAVE: 'playerLeft',
    PLAYER_READY: 'playerReady',

    // Drawing events
    DRAWING_SUBMIT: 'drawingSubmitted',
    DRAWING_CORRECT: 'drawingCorrect',
    DRAWING_INCORRECT: 'drawingIncorrect',

    // Chat events
    CHAT_MESSAGE: 'chatMessage'
};