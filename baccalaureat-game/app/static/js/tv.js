// This file contains the JavaScript code for the TV page, responsible for real-time display of scores, current letter, and game information.

const socket = io();

socket.on('connect', () => {
    console.log('Connected to server (TV)');
    socket.emit('register_tv');
});

socket.on('game_setup', (data) => {
    document.getElementById('game-name-display').textContent = data.name;
    document.getElementById('game-code-display').textContent = data.code;
});

socket.on('update_scores', (data) => {
    updateScores(data.scores);
});

socket.on('current_letter', (data) => {
    displayCurrentLetter(data.letter);
});

function updateScores(scores) {
    const scoresElement = document.getElementById('scores-list');
    scoresElement.innerHTML = '';
    for (const player in scores) {
        scoresElement.innerHTML += `<li>${player}: ${scores[player]}</li>`;
    }
}

function displayCurrentLetter(letter) {
    const letterElement = document.getElementById('letter');
    letterElement.textContent = letter;
}