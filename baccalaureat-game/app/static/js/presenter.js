// Fichier JavaScript pour la page du présentateur, gérant la création de la partie, la génération du code et du QR code, ainsi que les interactions avec les joueurs.

const socket = io();

document.addEventListener('DOMContentLoaded', () => {
    const genBtn = document.getElementById('generate-code');
    const startBtn = document.getElementById('start-game');
    const codeInput = document.getElementById('game-code');
    const nameInput = document.getElementById('game-name');

    genBtn.addEventListener('click', () => {
        socket.emit('request_code');
    });

    startBtn.addEventListener('click', () => {
        const payload = { code: codeInput.value.trim(), name: nameInput.value.trim() };
        socket.emit('presenter_setup', payload);
    });

    socket.on('tv_code', (data) => {
        codeInput.value = data.code;
        console.log('received tv_code', data);
        document.getElementById('status').textContent = 'Code reçu: ' + data.code;
    });

    socket.on('presenter_codes', (data) => {
        console.log('received presenter_codes', data);
        // If the code input is empty, use the first available code
        if (!codeInput.value && data.codes && data.codes.length > 0) {
            codeInput.value = data.codes[0];
            document.getElementById('status').textContent = 'Code auto attribué: ' + data.codes[0];
        }
    });

    socket.on('presenter_ack', (data) => {
        if (data.status === 'ok') {
            alert(`Partie "${data.name}" configurée (code ${data.code})`);
            console.log('presenter ack ok', data);
            document.getElementById('status').textContent = 'Partie configurée: ' + data.name;
            // optionally generate QR using an external lib
        } else {
            alert('Erreur: ' + data.message);
            document.getElementById('status').textContent = 'Erreur: ' + data.message;
        }
    });

    socket.on('connect', () => {
        console.log('presenter connected to server');
        document.getElementById('status').textContent = 'connecté';
        socket.emit('register_presenter');
    });

    // Fallback: fetch existing games from server on load in case socket events were missed
    fetch('/games')
        .then(r => r.json())
        .then(data => {
            if (!codeInput.value && data.codes && data.codes.length > 0) {
                codeInput.value = data.codes[0];
                document.getElementById('status').textContent = 'Code récupéré via HTTP: ' + data.codes[0];
            }
            // populate list of available codes
            const list = document.getElementById('available-codes');
            list.innerHTML = '';
            if (data.codes && data.codes.length > 0) {
                data.codes.forEach(c => {
                    const li = document.createElement('li');
                    li.textContent = c;
                    list.appendChild(li);
                });
            } else {
                const li = document.createElement('li');
                li.textContent = 'Aucun code disponible';
                list.appendChild(li);
            }
        })
        .catch(err => console.warn('Could not fetch /games', err));

// Poll /games every 2s to update available codes list
setInterval(() => {
    fetch('/games')
        .then(r => r.json())
        .then(data => {
            const list = document.getElementById('available-codes');
            list.innerHTML = '';
            if (data.codes && data.codes.length > 0) {
                data.codes.forEach(c => {
                    const li = document.createElement('li');
                    li.textContent = c;
                    list.appendChild(li);
                });
                if (!document.getElementById('game-code').value) {
                    document.getElementById('game-code').value = data.codes[0];
                }
            } else {
                const li = document.createElement('li');
                li.textContent = 'Aucun code disponible';
                list.appendChild(li);
            }
        })
        .catch(() => {});
}, 2000);
});