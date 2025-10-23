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
    });

    socket.on('presenter_ack', (data) => {
        if (data.status === 'ok') {
            alert(`Partie "${data.name}" configurée (code ${data.code})`);
            // optionally generate QR using an external lib
        } else {
            alert('Erreur: ' + data.message);
        }
    });
});