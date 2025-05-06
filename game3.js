// Variables globales del juego
let players = [];
let currentPlayerIndex = 0;
let questions = [];
let usedQuestions = [];
let scores = {};

// Elementos del DOM
const welcomeScreen = document.getElementById('welcome-screen');
const namesScreen = document.getElementById('names-screen');
const gameScreen = document.getElementById('game-screen');
const winnerScreen = document.getElementById('winner-screen');
const playerInputs = document.getElementById('player-inputs');
const startGameBtn = document.getElementById('start-game-btn');
const scoreboard = document.getElementById('scoreboard');
const currentPlayerDisplay = document.getElementById('current-player');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options');
const winnerName = document.getElementById('winner-name');
const winnerScore = document.getElementById('winner-score');
const playAgainBtn = document.getElementById('play-again-btn');

// Base de preguntas sobre Cali
const caliQuestions = [

    {
        question: "¿Cuál es el río principal que atraviesa Cali?",
        options: ["Río Magdalena", "Río Amazonas", "Río Cauca", "Río Bogotá"],
        correctAnswer: 2,
        fact: "El río Cauca es el segundo más importante de Colombia y atraviesa Cali de norte a sur."
    },
    {
        question: "¿Cómo se llama el equipo de fútbol más popular de Cali?",
        options: ["América de Cali", "Deportivo Cali", "Once Caldas", "Los dos primeros"],
        correctAnswer: 3,
        fact: "América y Deportivo Cali son los equipos más populares con una gran rivalidad."
    },
    {
        question: "¿Qué famoso festival musical se celebra anualmente en Cali?",
        options: ["Festival de Verano", "Festival de Música del Pacífico", "Feria de Cali", "Rock al Parque"],
        correctAnswer: 2,
        fact: "La Feria de Cali, con sus conciertos de salsa, se celebra cada diciembre desde 1957."
    },
    {
        question: "¿Cuál de estos sitios NO es un atractivo turístico de Cali?",
        options: ["El Gato del Río", "Cristo Rey", "Cerro de Monserrate", "Zoológico de Cali"],
        correctAnswer: 2,
        fact: "El Cerro de Monserrate está en Bogotá, no en Cali."
    },
 
    {
            question: "¿Qué baile es típico de la cultura caleña?",
            options: ["Salsa", "Cumbia", "Bachata", "Tango"],
            correctAnswer: 0,
            fact: "La salsa es el baile más representativo de Cali, conocida como la 'Capital Mundial de la Salsa'."
        },
        {
            question: "¿Cuál es el nombre del famoso barrio de Cali conocido por su vida nocturna?",
            options: ["San Antonio", "El Peñón", "Granada", "Versalles"],
            correctAnswer: 1,
            fact: "El Peñón es famoso por sus bares y restaurantes, especialmente en la zona de la Calle 5."
        },
        {
            question: "¿Qué fruta tropical es originaria de Cali?",
            options: ["Mango", "Piña", "Lulo", "Papaya"],
            correctAnswer: 2,
            fact: "El lulo es una fruta tropical muy popular en Cali y en toda Colombia."
        },
            
];

// Inicialización del juego
function initGame() {
    // Configurar botones de selección de jugadores
    document.querySelectorAll('#welcome-screen .btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const numPlayers = parseInt(e.target.dataset.players);
            setupPlayerInputs(numPlayers);
            welcomeScreen.classList.remove('active');
            namesScreen.classList.add('active');
        });
    });

    // Configurar botón de inicio
    startGameBtn.addEventListener('click', startGame);

    // Configurar botón de jugar nuevamente
    playAgainBtn.addEventListener('click', resetGame);

    // Mostrar pantalla inicial
    welcomeScreen.classList.add('active');
}

// Configurar campos de entrada para nombres de jugadores
function setupPlayerInputs(numPlayers) {
    playerInputs.innerHTML = '';
    players = [];
    
    for (let i = 1; i <= numPlayers; i++) {
        const div = document.createElement('div');
        div.className = 'player-input';
        div.innerHTML = `
            <label for="player${i}">Jugador ${i}:</label>
            <input type="text" id="player${i}" placeholder="Nombre del jugador ${i}" required>
        `;
        playerInputs.appendChild(div);
    }
}

// Comenzar el juego
function startGame() {
    // Validar que todos los nombres estén completos
    const inputs = document.querySelectorAll('#names-screen input');
    let allValid = true;
    
    players = [];
    inputs.forEach(input => {
        if (input.value.trim() === '') {
            allValid = false;
            input.style.borderColor = 'red';
        } else {
            players.push(input.value.trim());
            input.style.borderColor = '';
        }
    });
    
    if (!allValid) {
        alert('Por favor ingresa nombres para todos los jugadores');
        return;
    }
    
    // Inicializar puntajes
    scores = {};
    players.forEach(player => {
        scores[player] = 0;
    });
    
    // Preparar preguntas
    questions = [...caliQuestions];
    usedQuestions = [];
    
    // Cambiar a pantalla de juego
    namesScreen.classList.remove('active');
    gameScreen.classList.add('active');
    
    // Comenzar primer turno
    currentPlayerIndex = 0;
    startTurn();
}

// Comenzar turno de un jugador
function startTurn() {
    updateScoreboard();
    
    // Obtener pregunta aleatoria
    if (questions.length === 0) {
        if (usedQuestions.length === 0) {
            endGame();
            return;
        }
        questions = [...usedQuestions];
        usedQuestions = [];
    }
    
    const randomIndex = Math.floor(Math.random() * questions.length);
    const question = questions.splice(randomIndex, 1)[0];
    usedQuestions.push(question);
    
    // Mostrar pregunta
    currentPlayerDisplay.textContent = `Turno de: ${players[currentPlayerIndex]}`;
    questionText.textContent = question.question;
    
    // Mostrar opciones
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(index, question.correctAnswer, question.fact));
        optionsContainer.appendChild(button);
    });
}

// Verificar respuesta seleccionada
function checkAnswer(selectedIndex, correctIndex, fact) {
    const optionButtons = document.querySelectorAll('.option-btn');
    const currentPlayer = players[currentPlayerIndex];
    
    optionButtons.forEach((button, index) => {
        button.disabled = true;
        if (index === correctIndex) {
            button.classList.add('correct');
        } else if (index === selectedIndex && index !== correctIndex) {
            button.classList.add('incorrect');
        }
    });
    
    if (selectedIndex === correctIndex) {
        scores[currentPlayer]++;
        questionText.textContent = `¡Correcto! ${fact}`;
    } else {
        questionText.textContent = `Incorrecto. La respuesta correcta era: ${optionButtons[correctIndex].textContent}. ${fact}`;
    }
    
    // Pasar al siguiente jugador después de un breve retraso
    setTimeout(() => {
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
        
        // Verificar si algún jugador ha ganado
        if (scores[currentPlayer] >= 5) {
            endGame();
        } else {
            startTurn();
        }
    }, 3000);
}

// Actualizar marcador
function updateScoreboard() {
    scoreboard.innerHTML = '';
    
    players.forEach((player, index) => {
        const playerScore = document.createElement('div');
        playerScore.className = `player-score ${index === currentPlayerIndex ? 'active' : ''}`;
        playerScore.innerHTML = `
            <strong>${player}</strong>
            <div>${scores[player] || 0} pts</div>
        `;
        scoreboard.appendChild(playerScore);
    });
}

// Finalizar el juego
function endGame() {
    gameScreen.classList.remove('active');
    winnerScreen.classList.add('active');
    
    // Determinar ganador(es)
    let maxScore = -1;
    let winners = [];
    
    for (const player in scores) {
        if (scores[player] > maxScore) {
            maxScore = scores[player];
            winners = [player];
        } else if (scores[player] === maxScore) {
            winners.push(player);
        }
    }
    
    if (winners.length === 1) {
        winnerName.textContent = winners[0];
        winnerScore.textContent = `Puntuación: ${maxScore} puntos`;
    } else {
        winnerName.textContent = winners.join(' y ');
        winnerScore.textContent = `Empate con ${maxScore} puntos cada uno`;
    }
}

// Reiniciar el juego
function resetGame() {
    winnerScreen.classList.remove('active');
    welcomeScreen.classList.add('active');
}

// Iniciar el juego cuando se carga la página
window.addEventListener('DOMContentLoaded', initGame);