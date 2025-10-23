// This file contains the JavaScript code for the TV page, responsible for real-time display of scores, current letter, and game information.

const socket = io.connect('http://' + document.domain + ':' + location.port);

socket.on('connect', () => {
    console.log('Connected to the server');
});

socket.on('update_scores', (data) => {
    updateScores(data.scores);
});

socket.on('current_letter', (data) => {
    displayCurrentLetter(data.letter);
});

socket.on('game_info', (data) => {
    displayGameInfo(data.info);
});

function updateScores(scores) {
    const scoresElement = document.getElementById('scores');
    scoresElement.innerHTML = '';
    for (const player in scores) {
        scoresElement.innerHTML += `<li>${player}: ${scores[player]}</li>`;
    }
}

function displayCurrentLetter(letter) {
    const letterElement = document.getElementById('current-letter');
    letterElement.textContent = `Current Letter: ${letter}`;
}

function displayGameInfo(info) {
    const infoElement = document.getElementById('game-info');
    infoElement.textContent = info;
}