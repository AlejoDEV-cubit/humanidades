// Base de preguntas por categoría
const preguntas = {
    familia: [
        "¿Qué tradición familiar te gustaría preservar para las futuras generaciones?",
        "Cuenta un momento en que tu familia superó una dificultad juntos.",
        "¿Qué valor aprendiste de tus padres o abuelos que aún aplicas hoy?",
        "Si pudieras crear una nueva tradición familiar, ¿cuál sería y por qué?",
        "¿Qué consejo darías a una familia que está pasando por un momento difícil?"
    ],
    cali: [
        "¿Qué lugar de Cali te trae mejores recuerdos y por qué?",
        "Si pudieras resolver un problema de la ciudad, ¿cuál sería y cómo lo harías?",
        "¿Qué aspecto de la cultura caleña crees que debería ser más valorado?",
        "Describe cómo sería un día perfecto en Cali.",
        "¿Qué cambiarías de tu barrio para hacerlo más unido?"
    ],
    emociones: [
        "¿Qué emoción te cuesta más expresar y por qué?",
        "Comparte una estrategia que uses para manejar el estrés.",
        "¿Qué canción o arte te ayuda a entender mejor tus emociones?",
        "¿Cómo apoyas a alguien que está pasando por un momento emocional difícil?",
        "¿Qué hábito te ha ayudado a mejorar tu salud mental?"
    ]
};

// Elementos del DOM
const cardText = document.getElementById('card-text');
const deck = document.getElementById('deck');
const categoryButtons = document.querySelectorAll('.categories button');
let categoriaActual = 'familia';

// Evento para sacar una carta al hacer clic en el mazo
deck.addEventListener('click', sacarCarta);

// Eventos para cambiar categoría
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remover clase 'active' de todos los botones
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        // Añadir clase 'active' al botón clickeado
        button.classList.add('active');
        // Actualizar categoría actual
        categoriaActual = button.dataset.category;
    });
});

// Función para sacar una carta aleatoria
function sacarCarta() {
    const preguntasCategoria = preguntas[categoriaActual];
    const preguntaAleatoria = preguntasCategoria[Math.floor(Math.random() * preguntasCategoria.length)];
    
    // Animación al sacar carta
    cardText.style.opacity = '0';
    setTimeout(() => {
        cardText.textContent = preguntaAleatoria;
        cardText.style.opacity = '1';
    }, 300);
    
    // Efecto visual en el mazo
    deck.style.transform = 'scale(0.95)';
    setTimeout(() => {
        deck.style.transform = 'scale(1)';
    }, 200);
}

// Efecto hover en la carta actual (opcional)
const currentCard = document.getElementById('current-card');
currentCard.addEventListener('mouseenter', () => {
    currentCard.style.transform = 'translateY(-5px)';
});
currentCard.addEventListener('mouseleave', () => {
    currentCard.style.transform = 'translateY(0)';
});