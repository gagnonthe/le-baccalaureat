// Fichier JavaScript pour la page du présentateur, gérant la création de la partie, la génération du code et du QR code, ainsi que les interactions avec les joueurs.

const socket = io.connect('http://' + document.domain + ':' + location.port);

// Fonction pour créer une nouvelle partie
function createGame() {
    const gameName = document.getElementById('game-name').value;
    socket.emit('create_game', { name: gameName });
}

// Écouteur d'événements pour la création de la partie
socket.on('game_created', function(data) {
    document.getElementById('game-code').innerText = data.code;
    generateQRCode(data.code);
});

// Fonction pour générer un QR code
function generateQRCode(code) {
    const qrCodeContainer = document.getElementById('qr-code');
    qrCodeContainer.innerHTML = ''; // Effacer le contenu précédent
    const qrCode = new QRCode(qrCodeContainer, {
        text: code,
        width: 128,
        height: 128,
    });
}

// Fonction pour démarrer la partie
function startGame() {
    socket.emit('start_game');
}

// Écouteur d'événements pour le démarrage de la partie
socket.on('game_started', function() {
    alert('La partie a commencé !');
});

// Fonction pour envoyer une question aux joueurs
function sendQuestion() {
    const question = document.getElementById('question').value;
    socket.emit('send_question', { question: question });
}

// Écouteur d'événements pour la réception de la question
socket.on('question_sent', function(data) {
    document.getElementById('current-question').innerText = data.question;
});