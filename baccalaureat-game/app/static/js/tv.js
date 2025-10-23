// This file contains the JavaScript code for the TV page, responsible for real-time display of scores, current letter, and game information.

const socket = io();

socket.on('connect', () => {
    console.log('Connected to server (TV)');
    socket.emit('register_tv');
    // Request a code automatically when TV connects
    console.log('TV requesting a code from server');
    socket.emit('request_code');
    document.getElementById('status').textContent = 'connecté';
});

// Fallback: fetch existing games and display first one if available
fetch('/games')
    .then(r => r.json())
    .then(data => {
        if (data.codes && data.codes.length > 0) {
            document.getElementById('game-code-display').textContent = data.codes[0];
            document.getElementById('status').textContent = 'Code récupéré via HTTP: ' + data.codes[0];
        }
    })
    .catch(err => console.warn('Could not fetch /games', err));

// Poll /games every 2s to keep the TV updated in case socket events are missed
setInterval(() => {
    fetch('/games')
        .then(r => r.json())
        .then(data => {
            if (data.codes && data.codes.length > 0) {
                const code = data.codes[0];
                if (document.getElementById('game-code-display').textContent !== code) {
                    document.getElementById('game-code-display').textContent = code;
                    document.getElementById('status').textContent = 'Code récupéré via HTTP: ' + code;
                }
            }
        })
        .catch(() => {});
}, 2000);

socket.on('game_setup', (data) => {
    document.getElementById('game-name-display').textContent = data.name;
    document.getElementById('game-code-display').textContent = data.code;
    console.log('tv received game_setup', data);
    document.getElementById('status').textContent = `Partie: ${data.name} (code ${data.code})`;
});

// Also listen for a direct tv_code event (sent when a code is generated)
socket.on('tv_code', (data) => {
    console.log('tv received tv_code', data);
    document.getElementById('game-code-display').textContent = data.code;
    document.getElementById('status').textContent = 'Code reçu: ' + data.code;
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