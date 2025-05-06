// Variables del juego
let players = [];
let culpables = 1;
let roles = {};
let currentPlayerIndex = 0;
let eliminatedPlayers = [];
let nightVictim = null;
let savedPlayer = null;
let detectiveGuess = null;
let gameState = 'setup';

// Elementos del DOM
const setupScreen = document.getElementById('setup-screen');
const roleExplanationScreen = document.getElementById('role-explanation-screen');
const roleRevealScreen = document.getElementById('role-reveal-screen');
const nightScreen = document.getElementById('night-screen');
const culpablesScreen = document.getElementById('culpables-screen');
const detectiveScreen = document.getElementById('detective-screen');
const doctorScreen = document.getElementById('doctor-screen');
const resultScreen = document.getElementById('result-screen');
const dayScreen = document.getElementById('day-screen');
const winnerScreen = document.getElementById('winner-screen');

const playerInputs = document.getElementById('player-inputs');
const addPlayerBtn = document.getElementById('add-player-btn');
const culpablesInput = document.getElementById('culpables-input');
const startGameBtn = document.getElementById('start-game-btn');
const continueBtn = document.getElementById('continue-btn');
const currentPlayerName = document.getElementById('current-player-name');
const roleDisplay = document.getElementById('role-display');
const revealRoleBtn = document.getElementById('reveal-role-btn');
const nextPlayerBtn = document.getElementById('next-player-btn');
const nightContinueBtn = document.getElementById('night-continue-btn');
const culpablesPlayerList = document.getElementById('culpables-player-list');
const culpablesContinueBtn = document.getElementById('culpables-continue-btn');
const detectivePlayerList = document.getElementById('detective-player-list');
const detectiveContinueBtn = document.getElementById('detective-continue-btn');
const doctorPlayerList = document.getElementById('doctor-player-list');
const doctorContinueBtn = document.getElementById('doctor-continue-btn');
const nightResult = document.getElementById('night-result');
const dayContinueBtn = document.getElementById('day-continue-btn');
const dayPlayerList = document.getElementById('day-player-list');
const abstainBtn = document.getElementById('abstain-btn');
const winnerText = document.getElementById('winner-text');

// Historias narrativas
const deathStories = [
    "¡Tragedia en Cali! {player} fue encontrado/a con arepas envenenadas. ¡Qué final tan triste para un amante de la comida callejera!",
    "¡Escándalo en el estadio! {player} fue atropellado/a por una bicicleta del MIO. La ciudad llora su pérdida.",
    "En un giro inesperado, {player} desapareció después de decir que el cholado de Jamundí es mejor que el de Cali.",
    "{player} fue visto por última vez en el Gato del Río, ahora es solo un recuerdo... y un meme en Facebook.",
    "La salsa le falló a {player}, quien murió intentando bailar como John Leguizamo."
];

const savedStories = [
    "¡Milagro en Cali! {player} fue envenenado/a con lulada adulterada, pero el doctor llegó justo a tiempo!",
    "A {player} lo intentaron matar con un tinto de la Javeriana, pero el doctor lo salvó con un buen café del Juan Valdez.",
    "{player} casi muere al caer en el río Cauca, pero el doctor lo rescató... aunque perdió sus chanclas en el intento.",
    "¡Increíble! {player} sobrevivió a un ataque de guayacanes en plena primavera. Esas flores son más peligrosas de lo que parecen."
];

// Inicializar el juego
function initGame() {
    // Configurar eventos
    addPlayerBtn.addEventListener('click', addPlayerInput);
    startGameBtn.addEventListener('click', startGame);
    continueBtn.addEventListener('click', startRoleReveal);
    revealRoleBtn.addEventListener('click', revealRole);
    nextPlayerBtn.addEventListener('click', nextPlayer);
    nightContinueBtn.addEventListener('click', startCulpablesPhase);
    culpablesContinueBtn.addEventListener('click', startDetectivePhase);
    detectiveContinueBtn.addEventListener('click', startDoctorPhase);
    doctorContinueBtn.addEventListener('click', showNightResults);
    dayContinueBtn.addEventListener('click', startNightPhase);
    abstainBtn.addEventListener('click', () => voteToEliminate(null));
    
    // Mostrar pantalla inicial
    setupScreen.classList.add('active');
}

// Añadir campo para nuevo jugador
function addPlayerInput() {
    const playerNumber = document.querySelectorAll('.player-input').length + 1;
    const div = document.createElement('div');
    div.className = 'player-input';
    div.innerHTML = `
        <input type="text" id="player${playerNumber}" placeholder="Nombre del Jugador ${playerNumber}" required>
    `;
    playerInputs.appendChild(div);
}

// Comenzar el juego
function startGame() {
    // Validar nombres de jugadores
    const inputs = document.querySelectorAll('.player-input input');
    players = [];
    
    let allValid = true;
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
    
    // Validar cantidad de culpables
    culpables = parseInt(culpablesInput.value);
    if (isNaN(culpables) || culpables < 1 || culpables >= players.length / 2) {
        alert('La cantidad de culpables debe ser al menos 1 y menos de la mitad de jugadores');
        return;
    }
    
    // Asignar roles
    assignRoles();
    
    // Cambiar a pantalla de explicación de roles
    setupScreen.classList.remove('active');
    roleExplanationScreen.classList.add('active');
}

// Asignar roles aleatoriamente
function assignRoles() {
    roles = {};
    const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);
    
    // Asignar culpables
    for (let i = 0; i < culpables; i++) {
        roles[shuffledPlayers[i]] = 'CULPABLE';
    }
    
    // Asignar detective
    roles[shuffledPlayers[culpables]] = 'DETECTIVE';
    
    // Asignar doctor
    roles[shuffledPlayers[culpables + 1]] = 'DOCTOR';
    
    // Resto son inocentes
    for (let i = culpables + 2; i < shuffledPlayers.length; i++) {
        roles[shuffledPlayers[i]] = 'INOCENTE';
    }
}

// Comenzar revelación de roles
function startRoleReveal() {
    roleExplanationScreen.classList.remove('active');
    roleRevealScreen.classList.add('active');
    currentPlayerIndex = 0;
    showNextPlayer();
}

// Mostrar siguiente jugador para revelar rol
function showNextPlayer() {
    if (currentPlayerIndex >= players.length) {
        startNightPhase();
        return;
    }
    
    const player = players[currentPlayerIndex];
    currentPlayerName.textContent = player;
    roleDisplay.textContent = '????';
    revealRoleBtn.style.display = 'block';
    nextPlayerBtn.style.display = 'none';
}

// Revelar rol al jugador actual
function revealRole() {
    const player = players[currentPlayerIndex];
    const role = roles[player];
    
    let displayText = role;
    if (role === 'DETECTIVE' || role === 'DOCTOR') {
        displayText = `INOCENTE / ${role}`;
    }
    
    roleDisplay.textContent = displayText;
    revealRoleBtn.style.display = 'none';
    
    if (currentPlayerIndex === players.length - 1) {
        nextPlayerBtn.textContent = 'Devolver al Narrador';
    } else {
        nextPlayerBtn.textContent = 'Siguiente Jugador';
    }
    
    nextPlayerBtn.style.display = 'block';
}

// Pasar al siguiente jugador
function nextPlayer() {
    currentPlayerIndex++;
    showNextPlayer();
}

// Comenzar fase nocturna
function startNightPhase() {
    roleRevealScreen.classList.remove('active');
    resultScreen.classList.remove('active');
    dayScreen.classList.remove('active');
    
    nightVictim = null;
    savedPlayer = null;
    detectiveGuess = null;
    
    nightScreen.classList.add('active');
}

// Comenzar fase de culpables
function startCulpablesPhase() {
    nightScreen.classList.remove('active');
    
    // Mostrar lista de jugadores vivos para eliminar
    culpablesPlayerList.innerHTML = '';
    const alivePlayers = players.filter(p => !eliminatedPlayers.includes(p));
    
    alivePlayers.forEach(player => {
        const div = document.createElement('div');
        div.className = 'player-item';
        div.innerHTML = `
            <span>${player}</span>
            <button class="action-btn" data-player="${player}">Eliminar</button>
        `;
        culpablesPlayerList.appendChild(div);
    });
    
    // Configurar eventos de botones
    document.querySelectorAll('#culpables-player-list .action-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            nightVictim = e.target.dataset.player;
            e.target.textContent = '✔️ Elegido';
            e.target.disabled = true;
        });
    });
    
    culpablesScreen.classList.add('active');
}

// Comenzar fase de detective
function startDetectivePhase() {
    culpablesScreen.classList.remove('active');
    
    // Mostrar lista de jugadores vivos para sospechar
    detectivePlayerList.innerHTML = '';
    const alivePlayers = players.filter(p => !eliminatedPlayers.includes(p));
    
    alivePlayers.forEach(player => {
        const div = document.createElement('div');
        div.className = 'player-item';
        div.innerHTML = `
            <span>${player}</span>
            <button class="action-btn" data-player="${player}">Sospechar</button>
        `;
        detectivePlayerList.appendChild(div);
    });
    
    // Configurar eventos de botones
    document.querySelectorAll('#detective-player-list .action-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            detectiveGuess = e.target.dataset.player;
            e.target.textContent = '✔️ Elegido';
            e.target.disabled = true;
        });
    });
    
    detectiveScreen.classList.add('active');
}

// Comenzar fase de doctor
function startDoctorPhase() {
    detectiveScreen.classList.remove('active');
    
    // Mostrar lista de jugadores vivos para salvar
    doctorPlayerList.innerHTML = '';
    const alivePlayers = players.filter(p => !eliminatedPlayers.includes(p));
    
    alivePlayers.forEach(player => {
        const div = document.createElement('div');
        div.className = 'player-item';
        div.innerHTML = `
            <span>${player}</span>
            <button class="save-btn" data-player="${player}">Salvar</button>
        `;
        doctorPlayerList.appendChild(div);
    });
    
    // Configurar eventos de botones
    document.querySelectorAll('#doctor-player-list .save-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            savedPlayer = e.target.dataset.player;
            e.target.textContent = '✔️ Salvado';
            e.target.disabled = true;
        });
    });
    
    doctorScreen.classList.add('active');
}

// Mostrar resultados de la noche
function showNightResults() {
    doctorScreen.classList.remove('active');
    
    let story = '';
    const randomStoryIndex = Math.floor(Math.random() * deathStories.length);
    
    if (nightVictim && savedPlayer !== nightVictim) {
        // Jugador fue eliminado
        eliminatedPlayers.push(nightVictim);
        story = deathStories[randomStoryIndex].replace('{player}', nightVictim);
    } else if (nightVictim && savedPlayer === nightVictim) {
        // Jugador fue salvado
        const randomSavedIndex = Math.floor(Math.random() * savedStories.length);
        story = savedStories[randomSavedIndex].replace('{player}', nightVictim);
    } else {
        // Nadie fue eliminado
        story = "¡Noche tranquila en Cali! Todos despertaron sin incidentes... por ahora.";
    }
    
    nightResult.textContent = story;
    resultScreen.classList.add('active');
    
    // Verificar si hay ganador
    checkForWinner();
}

// Comenzar fase diurna
function startDayPhase() {
    resultScreen.classList.remove('active');
    
    // Mostrar lista de jugadores vivos para votar
    dayPlayerList.innerHTML = '';
    const alivePlayers = players.filter(p => !eliminatedPlayers.includes(p));
    
    alivePlayers.forEach(player => {
        const div = document.createElement('div');
        div.className = 'player-item';
        div.innerHTML = `
            <span>${player}</span>
            <button class="action-btn" data-player="${player}">Eliminar</button>
        `;
        dayPlayerList.appendChild(div);
    });
    
    // Configurar eventos de botones
    document.querySelectorAll('#day-player-list .action-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            voteToEliminate(e.target.dataset.player);
        });
    });
    
    dayScreen.classList.add('active');
}

// Votar para eliminar a un jugador
function voteToEliminate(player) {
    if (player) {
        eliminatedPlayers.push(player);
    }
    
    // Verificar si hay ganador
    if (!checkForWinner()) {
        startNightPhase();
    }
}

// Verificar si hay ganador
function checkForWinner() {
    const alivePlayers = players.filter(p => !eliminatedPlayers.includes(p));
    const aliveCulpables = alivePlayers.filter(p => roles[p] === 'CULPABLE').length;
    
    if (aliveCulpables === 0) {
        // Inocentes ganan
        showWinner('INOCENTES');
        return true;
    } else if (aliveCulpables >= alivePlayers.length - aliveCulpables) {
        // Culpables ganan
        showWinner('CULPABLES');
        return true;
    }
    
    return false;
}

// Mostrar pantalla de ganador
function showWinner(winner) {
    dayScreen.classList.remove('active');
    resultScreen.classList.remove('active');
    
    winnerText.textContent = `¡GANARON LOS ${winner}!`;
    
    if (winner === 'INOCENTES') {
        winnerText.style.color = '#2ecc71';
    } else {
        winnerText.style.color = '#e74c3c';
    }
    
    winnerScreen.classList.add('active');
}

// Iniciar el juego cuando se carga la página
window.addEventListener('DOMContentLoaded', initGame);