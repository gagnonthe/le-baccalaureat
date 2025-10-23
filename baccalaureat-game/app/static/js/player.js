// This file contains the JavaScript code for the player page, allowing users to enter the game code, submit their answers, and view their scores.

const socket = io(); // Initialize WebSocket connection

document.addEventListener('DOMContentLoaded', () => {
    const joinForm = document.getElementById('join-form');
    const answerForm = document.getElementById('answer-form');
    const scoreDisplay = document.getElementById('score-display');
    const messageDisplay = document.getElementById('message-display');

    // Join game event
    joinForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const gameCode = document.getElementById('game-code').value;
        socket.emit('join_game', { gameCode });
    });

    // Submit answer event
    answerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const answer = document.getElementById('answer').value;
        socket.emit('submit_answer', { answer });
    });

    // Listen for score updates
    socket.on('update_score', (data) => {
        scoreDisplay.textContent = `Your Score: ${data.score}`;
    });

    // Listen for messages from the server
    socket.on('message', (data) => {
        messageDisplay.textContent = data.message;
    });
});