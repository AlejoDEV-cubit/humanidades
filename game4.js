// Variables del juego
let players = [];
let currentPlayerIndex = 0;
let scores = {};
let currentWord = '';
let currentTheme = '';
let usedPlayers = [];
let gameRound = 1;

// Palabras por categoría
const wordsByTheme = {
    animales: ['León', 'Elefante', 'Jirafa', 'Tigre', 'Mono', 'Cebra', 'Hipopótamo', 'Cocodrilo', 'Águila', 'Serpiente', 'Perro', 'Gato', 'Rinoceronte', 'Ballena', 'Delfín','Tortuga', 'Pingüino', 'Oso', 'Lobo', 'Zorro', 'Rata', 'Ratón', 'Armadillo', 'Canguro', 'Koala', 'Panda', 'Gorila', 'Chimpancé', 'Orangután', 'Lemur', 'Nutria', 'Castor', 'Hiena', 'Búfalo', 'Antílope', 'Ciervo', 'Gato montés', 'Jaguar', 'Leopardo', 'Pantera', 'Cheetah', 'Lince', 'Puma', 'Gato salvaje', 'Gato doméstico', 'Perro doméstico', 'Perro salvaje', 'Lobo gris', 'Lobo ártico', 'Zorro ártico', 'Zorro rojo', 'Zorro gris'],
    peliculas: ['El Rey León', 'Titanic', 'Avatar', 'Jurassic Park', 'Star Wars', 'Frozen', 'Toy Story', 'Harry Potter', 'El Señor de los Anillos', 'Matrix', 'Piratas del Caribe', 'Los Vengadores', 'Spiderman', 'Batman', 'Superman', 'Wonderwoman', 'Iron', 'Thor', 'Hulk', 'Capitán América', 'Black Widow', 'Doctor Strange'],
    frutas: ['Manzana', 'Banana', 'Naranja', 'Fresa', 'Piña', 'Mango', 'Sandía', 'Melón', 'Uva', 'Kiwi', 'Cereza', 'Papaya', 'Durazno', 'Pera', 'Coco', 'Frambuesa', 'Arándano', 'Granadilla', 'Maracuyá', 'Mandarina', 'Limón', 'Pomelo', 'Guayaba', 'Papaya', 'Lima', 'Clementina', 'Tamarindo', 'Ciruela', 'Almendra', 'Nuez', 'Avellana', 'Pistacho', 'Castaña', 'Nuez de Brasil', 'Macadamia', 'Pecan', 'Cacahuate', 'Anacardo', 'Nuez de la India', 'Semilla de calabaza', 'Semilla de girasol', 'Semilla de chía', 'Semilla de lino', 'Semilla de sésamo', 'Semilla de cáñamo', 'Semilla de amapola', 'Semilla de mostaza', 'Semilla de hinojo', 'Semilla de alcaravea'],
    personajes: ['Messi', 'Shakira', 'Superman', 'Mickey Mouse', 'Doraemon', 'Harry Potter', 'Elsa', 'Spider-Man', 'Batman', 'Hombre Araña','Barbie', 'Mario Bros', 'Luigi', 'Peach', 'Sonic', 'Pikachu', 'Ash Ketchum', 'Goku', 'Vegeta', 'Naruto', 'Sasuke',
'Iron Man', 'Capitán América', 'Hulk', 'Thor', 'Loki', 'Black Widow', 'Doctor Strange', 'Wanda Maximoff', 'Deadpool',
'Wolverine', 'Thanos', 'Homero Simpson', 'Bart Simpson', 'Lisa Simpson', 'Marge Simpson', 'Bob Esponja', 'Patricio Estrella',
'Calamardo', 'Don Cangrejo', 'Dora la Exploradora', 'Boots', 'Ben 10', 'Finn el Humano', 'Jake el Perro', 'Steven Universe',
'Garnet', 'Amatista', 'Perla', 'Rick', 'Morty', 'Rayo McQueen', 'Mate', 'Woody', 'Buzz Lightyear', 'Sully', 'Mike Wazowski',
'Shrek', 'Burro', 'Fiona', 'Lord Farquaad', 'Po', 'Tigre', 'Maestro Shifu', 'Gru', 'Los Minions', 'Jack Sparrow',
'Elizabeth Swann', 'Will Turner', 'Katniss Everdeen', 'Peeta Mellark', 'Gale Hawthorne', 'Eleven', 'Vecna',
'Wednesday Addams', 'Merlina', 'Gómez Addams', 'Morticia', 'Chucky', 'Freddy Krueger', 'Jason Voorhees', 'Pennywise',
'Michael Myers', 'Annabelle', 'El Conjuro', 'Gandalf', 'Frodo', 'Aragorn', 'Legolas', 'Thranduil', 'Gollum',
'Geralt de Rivia', 'Yennefer', 'Ciri', 'Lara Croft', 'Nathan Drake', 'Kratos', 'Atreus', 'Joel', 'Ellie',
'Tom Holland', 'Zendaya', 'Taylor Swift', 'Beyoncé', 'Rihanna', 'Lady Gaga', 'Dua Lipa', 'Bad Bunny',
'Karol G', 'Maluma', 'J Balvin', 'Anitta', 'Peso Pluma', 'Drake', 'The Weeknd', 'Kanye West', 'Kendrick Lamar',
'Billie Eilish', 'Eminem', 'Jay-Z', 'Nicki Minaj', 'Ariana Grande', 'Selena Gomez', 'Justin Bieber',
'Shawn Mendes', 'Camila Cabello', 'Olivia Rodrigo', 'Doja Cat', 'SZA', 'Travis Scott', 'Lil Nas X',
'Cristiano Ronaldo', 'Lionel Messi', 'Neymar', 'Mbappé', 'Ronaldinho', 'Zlatan Ibrahimović',
'Michael Jordan', 'LeBron James', 'Stephen Curry', 'Kobe Bryant', 'Dennis Rodman', 'Usain Bolt',
'Serena Williams', 'Naomi Osaka', 'Lewis Hamilton', 'Max Verstappen', 'Fernando Alonso',
'Kim Kardashian', 'Kylie Jenner', 'Kendall Jenner', 'Gigi Hadid', 'Bella Hadid', 'Hailey Bieber',
'Zendaya', 'Timothée Chalamet', 'Florence Pugh', 'Emma Watson', 'Tom Hanks', 'Leonardo DiCaprio',
'Robert Downey Jr.', 'Chris Hemsworth', 'Scarlett Johansson', 'Jennifer Lawrence',
'Pedro Pascal', 'Oscar Isaac', 'Henry Cavill', 'Gal Gadot', 'Millie Bobby Brown', 'Noah Schnapp',
'Adam Sandler', 'Jim Carrey', 'Will Smith', 'Dwayne Johnson', 'Kevin Hart', 'Jack Black',
'Megan Fox', 'Angelina Jolie', 'Brad Pitt', 'Johnny Depp', 'Keanu Reeves', 'Morgan Freeman',
'Samuel L. Jackson', 'Natalie Portman', 'Anne Hathaway', 'Emma Stone', 'Ryan Reynolds',
'Ryan Gosling', 'Margot Robbie', 'Cillian Murphy', 'Christian Bale', 'Heath Ledger',
'Zendaya', 'Zendaya', 'Elon Musk', 'Steve Jobs',
'Mark Zuckerberg', 'Jeff Bezos', 'Bill Gates', 'Oprah Winfrey', 'Stephen Hawking', 'Albert Einstein',
'Marie Curie', 'Isaac Newton', 'Nikola Tesla', 'Frida Kahlo', 'Pablo Picasso', 'Leonardo da Vinci',
'Vincent van Gogh', 'Salvador Dalí', 'Banksy', 'Andy Warhol', 'Chabelo', 'Cantinflas',
'El Chavo del 8', 'Don Ramón', 'Quico', 'La Chilindrina', 'Profesor Jirafales', 'Doña Florinda',
'Gokú', 'Ichigo Kurosaki', 'Luffy', 'Zoro', 'Sanji', 'Light Yagami', 'L', 'Levi Ackerman',],

    random: ['León', 'Elefante', 'Jirafa', 'Tigre', 'Mono', 'Cebra', 'Hipopótamo', 'Cocodrilo', 'Águila', 'Serpiente', 'Perro', 'Gato', 'Rinoceronte', 'Ballena', 'Delfín','Tortuga', 'Pingüino', 'Oso', 'Lobo', 'Zorro', 'Rata', 'Ratón', 'Armadillo', 'Canguro', 'Koala', 'Panda', 'Gorila', 'Chimpancé', 'Orangután', 'Lemur', 'Nutria', 'Castor', 'Hiena', 'Búfalo', 'Antílope', 'Ciervo', 'Gato montés', 'Jaguar', 'Leopardo', 'Pantera', 'Cheetah', 'Lince', 'Puma', 'Gato salvaje', 'Gato doméstico', 'Perro doméstico', 'Perro salvaje', 'Lobo gris', 'Lobo ártico', 'Zorro ártico', 'Zorro rojo', 'Zorro gris',
    'El Rey León', 'Titanic', 'Avatar', 'Jurassic Park', 'Star Wars', 'Frozen', 'Toy Story', 'Harry Potter', 'El Señor de los Anillos', 'Matrix', 'Piratas del Caribe', 'Los Vengadores', 'Spiderman', 'Batman', 'Superman', 'Wonderwoman', 'Iron', 'Thor', 'Hulk', 'Capitán América', 'Black Widow', 'Doctor Strange',
    'Manzana', 'Banana', 'Naranja', 'Fresa', 'Piña', 'Mango', 'Sandía', 'Melón', 'Uva', 'Kiwi', 'Cereza', 'Papaya', 'Durazno', 'Pera', 'Coco', 'Frambuesa', 'Arándano', 'Granadilla', 'Maracuyá', 'Mandarina', 'Limón', 'Pomelo', 'Guayaba', 'Papaya', 'Lima', 'Clementina', 'Tamarindo', 'Ciruela', 'Almendra', 'Nuez', 'Avellana', 'Pistacho', 'Castaña', 'Nuez de Brasil', 'Macadamia', 'Pecan', 'Cacahuate', 'Anacardo', 'Nuez de la India', 'Semilla de calabaza', 'Semilla de girasol', 'Semilla de chía', 'Semilla de lino', 'Semilla de sésamo', 'Semilla de cáñamo', 'Semilla de amapola', 'Semilla de mostaza', 'Semilla de hinojo', 'Semilla de alcaravea',
    'Messi', 'Shakira', 'Superman', 'Mickey Mouse', 'Doraemon', 'Harry Potter', 'Elsa', 'Spider-Man', 'Batman', 'Hombre Araña','Barbie', 'Mario Bros', 'Luigi', 'Peach', 'Sonic', 'Pikachu', 'Ash Ketchum', 'Goku', 'Vegeta', 'Naruto', 'Sasuke',
'Iron Man', 'Capitán América', 'Hulk', 'Thor', 'Loki', 'Black Widow', 'Doctor Strange', 'Wanda Maximoff', 'Deadpool',
'Wolverine', 'Thanos', 'Homero Simpson', 'Bart Simpson', 'Lisa Simpson', 'Marge Simpson', 'Bob Esponja', 'Patricio Estrella',
'Calamardo', 'Don Cangrejo', 'Dora la Exploradora', 'Boots', 'Ben 10', 'Finn el Humano', 'Jake el Perro', 'Steven Universe',
'Garnet', 'Amatista', 'Perla', 'Rick', 'Morty', 'Rayo McQueen', 'Mate', 'Woody', 'Buzz Lightyear', 'Sully', 'Mike Wazowski',
'Shrek', 'Burro', 'Fiona', 'Lord Farquaad', 'Po', 'Tigre', 'Maestro Shifu', 'Gru', 'Los Minions', 'Jack Sparrow',
'Elizabeth Swann', 'Will Turner', 'Katniss Everdeen', 'Peeta Mellark', 'Gale Hawthorne', 'Eleven', 'Vecna',
'Wednesday Addams', 'Merlina', 'Gómez Addams', 'Morticia', 'Chucky', 'Freddy Krueger', 'Jason Voorhees', 'Pennywise',
'Michael Myers', 'Annabelle', 'El Conjuro', 'Gandalf', 'Frodo', 'Aragorn', 'Legolas', 'Thranduil', 'Gollum',
'Geralt de Rivia', 'Yennefer', 'Ciri', 'Lara Croft', 'Nathan Drake', 'Kratos', 'Atreus', 'Joel', 'Ellie',
'Tom Holland', 'Zendaya', 'Taylor Swift', 'Beyoncé', 'Rihanna', 'Lady Gaga', 'Dua Lipa', 'Bad Bunny',
'Karol G', 'Maluma', 'J Balvin', 'Anitta', 'Peso Pluma', 'Drake', 'The Weeknd', 'Kanye West', 'Kendrick Lamar',
'Billie Eilish', 'Eminem', 'Jay-Z', 'Nicki Minaj', 'Ariana Grande', 'Selena Gomez', 'Justin Bieber',
'Shawn Mendes', 'Camila Cabello', 'Olivia Rodrigo', 'Doja Cat', 'SZA', 'Travis Scott', 'Lil Nas X',
'Cristiano Ronaldo', 'Lionel Messi', 'Neymar', 'Mbappé', 'Ronaldinho', 'Zlatan Ibrahimović',
'Michael Jordan', 'LeBron James', 'Stephen Curry', 'Kobe Bryant', 'Dennis Rodman', 'Usain Bolt',
'Serena Williams', 'Naomi Osaka', 'Lewis Hamilton', 'Max Verstappen', 'Fernando Alonso',
'Kim Kardashian', 'Kylie Jenner', 'Kendall Jenner', 'Gigi Hadid', 'Bella Hadid', 'Hailey Bieber',
'Zendaya', 'Timothée Chalamet', 'Florence Pugh', 'Emma Watson', 'Tom Hanks', 'Leonardo DiCaprio',
'Robert Downey Jr.', 'Chris Hemsworth', 'Scarlett Johansson', 'Jennifer Lawrence',
'Pedro Pascal', 'Oscar Isaac', 'Henry Cavill', 'Gal Gadot', 'Millie Bobby Brown', 'Noah Schnapp',
'Adam Sandler', 'Jim Carrey', 'Will Smith', 'Dwayne Johnson', 'Kevin Hart', 'Jack Black',
'Megan Fox', 'Angelina Jolie', 'Brad Pitt', 'Johnny Depp', 'Keanu Reeves', 'Morgan Freeman',
'Samuel L. Jackson', 'Natalie Portman', 'Anne Hathaway', 'Emma Stone', 'Ryan Reynolds',
'Ryan Gosling', 'Margot Robbie', 'Cillian Murphy', 'Christian Bale', 'Heath Ledger',
'Zendaya', 'Zendaya', 'Elon Musk', 'Steve Jobs',
'Mark Zuckerberg', 'Jeff Bezos', 'Bill Gates', 'Oprah Winfrey', 'Stephen Hawking', 'Albert Einstein',
'Marie Curie', 'Isaac Newton', 'Nikola Tesla', 'Frida Kahlo', 'Pablo Picasso', 'Leonardo da Vinci',
'Vincent van Gogh', 'Salvador Dalí', 'Banksy', 'Andy Warhol', 'Chabelo', 'Cantinflas',
'El Chavo del 8', 'Don Ramón', 'Quico', 'La Chilindrina', 'Profesor Jirafales', 'Doña Florinda',
'Gokú', 'Ichigo Kurosaki', 'Luffy', 'Zoro', 'Sanji', 'Light Yagami', 'L', 'Levi Ackerman',]
};

// Elementos del DOM
const playersScreen = document.getElementById('players-screen');
const themeScreen = document.getElementById('theme-screen');
const gameScreen = document.getElementById('game-screen');
const snitchScreen = document.getElementById('snitch-screen');
const scoresScreen = document.getElementById('scores-screen');
const winnerScreen = document.getElementById('winner-screen');
const playerInputs = document.getElementById('player-inputs');
const addPlayerBtn = document.getElementById('add-player-btn');
const startGameBtn = document.getElementById('start-game-btn');
const themeButtons = document.querySelectorAll('.theme-btn');
const currentGuesser = document.getElementById('current-guesser');
const wordDisplay = document.getElementById('word-display');
const gameButtons = document.getElementById('game-buttons');
const giveUpBtn = document.getElementById('give-up-btn');
const correctBtn = document.getElementById('correct-btn');
const snitchList = document.getElementById('snitch-list');
const continueBtn = document.getElementById('continue-btn');
const scoresList = document.getElementById('scores-list');
const nextRoundBtn = document.getElementById('next-round-btn');
const winnerName = document.getElementById('winner-name');

// Inicializar el juego
function initGame() {
    // Configurar botones
    addPlayerBtn.addEventListener('click', addPlayerInput);
    startGameBtn.addEventListener('click', startThemeSelection);
    themeButtons.forEach(btn => {
        btn.addEventListener('click', selectTheme);
    });
    giveUpBtn.addEventListener('click', playerGaveUp);
    correctBtn.addEventListener('click', playerGuessedCorrectly);
    continueBtn.addEventListener('click', continueToScores);
    nextRoundBtn.addEventListener('click', startNextRound);
    
    // Configurar evento para mostrar palabra cuando tocan la pantalla
    gameScreen.addEventListener('click', showWord);
    
    // Mostrar pantalla inicial
    playersScreen.classList.add('active');
    
    // Añadir primer jugador por defecto
    addPlayerInput();
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

// Comenzar selección de tema
function startThemeSelection() {
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
    
    // Inicializar puntajes
    scores = {};
    players.forEach(player => {
        scores[player] = 0;
    });
    
    // Cambiar a pantalla de selección de tema
    playersScreen.classList.remove('active');
    themeScreen.classList.add('active');
}

// Seleccionar tema y comenzar juego
function selectTheme(e) {
    currentTheme = e.target.dataset.theme;
    themeScreen.classList.remove('active');
    startRound();
}

// Comenzar una ronda
function startRound() {
    // Reiniciar lista de jugadores usados si ya todos jugaron
    if (usedPlayers.length === players.length) {
        usedPlayers = [];
    }
    
    // Seleccionar jugador aleatorio que no haya jugado en esta ronda
    let availablePlayers = players.filter(player => !usedPlayers.includes(player));
    const randomIndex = Math.floor(Math.random() * availablePlayers.length);
    const currentPlayer = availablePlayers[randomIndex];
    usedPlayers.push(currentPlayer);
    
    // Seleccionar palabra aleatoria
    const words = wordsByTheme[currentTheme];
    currentWord = words[Math.floor(Math.random() * words.length)];
    
    // Configurar pantalla de juego
    currentGuesser.textContent = `¡Es tu turno, ${currentPlayer}!`;
    wordDisplay.textContent = '???';
    gameButtons.style.display = 'none';
    
    // Mostrar pantalla de juego
    gameScreen.classList.add('active');
}

// Mostrar palabra cuando tocan la pantalla
function showWord() {
    if (wordDisplay.textContent === '???') {
        wordDisplay.textContent = currentWord;
        gameButtons.style.display = 'block';
    }
}

// Jugador se rinde
function playerGaveUp() {
    gameScreen.classList.remove('active');
    showSnitchScreen(false);
}

// Jugador adivina correctamente
function playerGuessedCorrectly() {
    const currentPlayer = players.find(player => currentGuesser.textContent.includes(player));
    scores[currentPlayer]++;
    
    // Verificar si alguien ganó
    if (scores[currentPlayer] >= 10) {
        showWinner(currentPlayer);
        return;
    }
    
    gameScreen.classList.remove('active');
    showSnitchScreen(true);
}

// Mostrar pantalla para reportar soplones
function showSnitchScreen(guessedCorrectly) {
    snitchList.innerHTML = '';
    
    players.forEach(player => {
        // No mostrar al jugador que estaba adivinando
        if (!currentGuesser.textContent.includes(player)) {
            const div = document.createElement('div');
            div.className = 'snitch-item';
            div.innerHTML = `
                <span>${player}</span>
                <button class="snitch-btn" data-player="${player}">Soplón</button>
            `;
            snitchList.appendChild(div);
        }
    });
    
    // Configurar eventos de botones soplón
    document.querySelectorAll('.snitch-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const player = e.target.dataset.player;
            scores[player] = Math.max(0, scores[player] - 1); // No permitir puntajes negativos
            continueToScores();
        });
    });
    
    snitchScreen.classList.add('active');
}

// Continuar a pantalla de puntuaciones
function continueToScores() {
    snitchScreen.classList.remove('active');
    showScores();
}

// Mostrar puntuaciones
function showScores() {
    scoresList.innerHTML = '';
    
    // Ordenar jugadores por puntaje
    const sortedPlayers = [...players].sort((a, b) => scores[b] - scores[a]);
    
    sortedPlayers.forEach(player => {
        const div = document.createElement('div');
        div.className = 'score-item';
        div.innerHTML = `
            <span class="name">${player}</span>
            <span class="points">${scores[player]} pts</span>
        `;
        scoresList.appendChild(div);
    });
    
    scoresScreen.classList.add('active');
}

// Comenzar siguiente ronda
function startNextRound() {
    scoresScreen.classList.remove('active');
    startRound();
}

// Mostrar ganador
function showWinner(player) {
    winnerName.textContent = player;
    scoresScreen.classList.remove('active');
    winnerScreen.classList.add('active');
}

// Iniciar el juego cuando se carga la página
window.addEventListener('DOMContentLoaded', initGame);