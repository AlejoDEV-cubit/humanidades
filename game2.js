// Base de dilemas con opciones y resultados
const dilemas = [
    {
        titulo: "El parque inseguro",
        descripcion: "Hay un parque en tu barrio que se ha vuelto peligroso por robos. Un grupo de vecinos quiere organizar una guardia nocturna, pero otros dicen que es muy arriesgado. ¿Qué harías?",
        opciones: [
            {
                texto: "Unirme a la guardia comunitaria",
                resultado: "Ayudas a mejorar la seguridad, pero enfrentas riesgos personales. Reflexión: El trabajo en equipo fortalece la comunidad, pero requiere precaución."
            },
            {
                texto: "Pedir más presencia policial",
                resultado: "Las autoridades aumentan patrullajes, pero no resuelven el problema de fondo. Reflexión: Las soluciones institucionales son necesarias, pero no siempre suficientes."
            },
            {
                texto: "Evitar el parque y no involucrarme",
                resultado: "Te proteges, pero el problema sigue afectando a otros. Reflexión: La indiferencia puede perpetuar los problemas sociales."
            }
        ]
    },
    {
        titulo: "El amigo en problemas",
        descripcion: "Un amigo cercano está pasando por una crisis emocional y bebe demasiado. ¿Cómo lo ayudas?",
        opciones: [
            {
                texto: "Hablar con él sinceramente",
                resultado: "Al principio se molesta, pero luego agradece tu apoyo. Reflexión: La comunicación honesta puede salvar vidas."
            },
            {
                texto: "Buscar ayuda profesional sin decirle",
                resultado: "Se siente traicionado, pero luego entiende tu preocupación. Reflexión: A veces las decisiones difíciles son necesarias."
            },
            {
                texto: "Ignorarlo para no empeorar las cosas",
                resultado: "Su situación empeora con el tiempo. Reflexión: No actuar también es una decisión con consecuencias."
            }
        ]
    }
];

// Elementos del DOM
const dilemaText = document.getElementById('dilema-text');
const opcionesContainer = document.getElementById('opciones');
const resultadoDiv = document.getElementById('resultado');

// Cargar un dilema aleatorio
function cargarDilema() {
    const dilema = dilemas[Math.floor(Math.random() * dilemas.length)];
    
    dilemaText.innerHTML = `<h3>${dilema.titulo}</h3><p>${dilema.descripcion}</p>`;
    opcionesContainer.innerHTML = '';
    
    dilema.opciones.forEach((opcion, index) => {
        const boton = document.createElement('button');
        boton.className = 'opcion-btn';
        boton.textContent = opcion.texto;
        boton.onclick = () => mostrarResultado(opcion.resultado);
        opcionesContainer.appendChild(boton);
    });
    
    resultadoDiv.style.display = 'none';
}

// Mostrar el resultado de la opción elegida
function mostrarResultado(resultado) {
    resultadoDiv.innerHTML = `<p>${resultado}</p>`;
    resultadoDiv.style.display = 'block';
    
    // Opcional: Botón para siguiente dilema
    const siguienteBtn = document.createElement('button');
    siguienteBtn.className = 'opcion-btn';
    siguienteBtn.textContent = 'Siguiente dilema';
    siguienteBtn.onclick = cargarDilema;
    resultadoDiv.appendChild(siguienteBtn);
}

// Iniciar el juego al cargar la página
window.onload = cargarDilema;