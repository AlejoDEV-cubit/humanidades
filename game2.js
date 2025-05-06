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
    ,
    {
        titulo: "El dilema del reciclaje",
        descripcion: "Vives en una ciudad donde el reciclaje no es obligatorio. Un día ves a un vecino tirando botellas de plástico al basurero. ¿Qué haces?",
        opciones: [
            {
                texto: "Hablar con él sobre la importancia del reciclaje",
                resultado: "Tu vecino se siente avergonzado, pero empieza a reciclar. Reflexión: La educación ambiental es clave para el cambio."
            },
            {
                texto: "Recoger las botellas y llevarlas al reciclaje",
                resultado: "Tu vecino se siente agradecido y empieza a reciclar también. Reflexión: A veces, las acciones individuales inspiran a otros."
            },
            {
                texto: "No hacer nada, es su decisión",
                resultado: "El problema del reciclaje sigue sin resolverse. Reflexión: La apatía puede perpetuar problemas ambientales."
            }
        ]
    }
    ,
    {
        titulo: "El dilema del tráfico",
        descripcion: "Vas manejando y ves a un ciclista que se cae. No hay nadie más alrededor. ¿Qué haces?",
        opciones: [
            {
                texto: "Detenerme y ayudar al ciclista",
                resultado: "El ciclista agradece tu ayuda y se siente mejor. Reflexión: La empatía puede marcar la diferencia en la vida de alguien."
            },
            {
                texto: "Llamar a emergencias y seguir mi camino",
                resultado: "El ciclista recibe atención médica, pero se siente solo. Reflexión: A veces, la ayuda a distancia es necesaria."
            },
            {
                texto: "Ignorarlo, no es mi problema",
                resultado: "El ciclista queda herido y sin ayuda. Reflexión: La indiferencia puede tener consecuencias graves."
            }
        ]
    }
    ,
    {
        titulo: "El dilema del trabajo en equipo",
        descripcion: "Estás trabajando en un proyecto grupal y uno de tus compañeros no está cumpliendo con su parte. ¿Qué haces?",
        opciones: [
            {
                texto: "Hablar con él y ofrecerle ayuda",
                resultado: "Tu compañero se siente apoyado y mejora su rendimiento. Reflexión: La colaboración puede fortalecer los lazos del equipo."
            },
            {
                texto: "Informar al profesor sobre el problema",
                resultado: "El profesor interviene, pero tu compañero se siente avergonzado. Reflexión: A veces, es necesario tomar medidas drásticas."
            },
            {
                texto: "Hacer su parte para que el proyecto salga bien",
                resultado: "El proyecto es exitoso, pero te sientes resentido. Reflexión: Sacrificarse por el grupo puede generar frustración."
            }
        ]
    }
    ,
    {
        titulo: "El dilema del tiempo libre",
        descripcion: "Tienes un día libre y tus amigos te invitan a salir, pero tienes muchas tareas pendientes. ¿Qué haces?",
        opciones: [
            {
                texto: "Ir con mis amigos y dejar las tareas para después",
                resultado: "Te diviertes, pero luego te sientes abrumado por las tareas. Reflexión: A veces, es bueno desconectar, pero hay que encontrar un equilibrio."
            },
            {
                texto: "Quedarme en casa y hacer las tareas",
                resultado: "Terminas todo a tiempo, pero te pierdes de la diversión. Reflexión: La responsabilidad es importante, pero también lo es disfrutar de la vida."
            },
            {
                texto: "Hacer un poco de cada cosa",
                resultado: "Logras un equilibrio entre diversión y responsabilidad. Reflexión: La moderación puede ser la clave para una vida equilibrada."
            }
        ]
    }
    ,
    {
        titulo: "El dilema del voluntariado",
        descripcion: "Te ofrecen hacer voluntariado en un hogar de ancianos, pero no tienes tiempo. ¿Qué haces?",
        opciones: [
            {
                texto: "Aceptar y organizar mi tiempo",
                resultado: "Ayudas a los ancianos y te sientes realizado. Reflexión: El voluntariado puede enriquecer tu vida."
            },
            {
                texto: "Rechazarlo por falta de tiempo",
                resultado: "Te sientes culpable, pero entiendes tus límites. Reflexión: A veces, es necesario priorizar el autocuidado."
            },
            {
                texto: "Ofrecer ayuda ocasionalmente",
                resultado: "Los ancianos aprecian tu esfuerzo, aunque sea poco frecuente. Reflexión: Cada pequeño gesto cuenta."
            }
        ]
    }
    ,
    {
        titulo: "El dilema del consumo responsable",
        descripcion: "Vas a comprar ropa y ves una oferta increíble, pero sabes que la marca tiene malas prácticas laborales. ¿Qué haces?",
        opciones: [
            {
                texto: "Comprar la ropa y no pensar en ello",
                resultado: "Disfrutas de la compra, pero te sientes mal por las consecuencias. Reflexión: A veces, la ignorancia es más fácil."
            },
            {
                texto: "Investigar sobre la marca antes de comprar",
                resultado: "Decides no comprar y buscar alternativas éticas. Reflexión: La conciencia social puede guiar nuestras decisiones."
            },
            {
                texto: "Hablar con amigos sobre el tema",
                resultado: "Generas un debate interesante, pero no cambias tu decisión. Reflexión: La conversación es importante, pero las acciones cuentan más."
            }
        ]
    }
    ,
    {
        titulo: "El dilema del tiempo en redes sociales",
        descripcion: "Pasas mucho tiempo en redes sociales y sientes que afecta tu productividad. ¿Qué haces?",
        opciones: [
            {
                texto: "Desactivar mis cuentas por un tiempo",
                resultado: "Te sientes más productivo, pero extrañas a tus amigos. Reflexión: A veces, desconectar es necesario."
            },
            {
                texto: "Limitar el tiempo que paso en ellas",
                resultado: "Encuentras un equilibrio entre redes y productividad. Reflexión: La moderación es clave para una vida saludable."
            },
            {
                texto: "No hacer nada, me gusta estar conectado",
                resultado: "Tu productividad sigue afectada, pero disfrutas de las redes. Reflexión: Cada uno tiene su propio equilibrio."
            }
        ]
    }
    ,
    {
        titulo: "El dilema del uso de tecnología",
        descripcion: "Tu amigo te pide prestado tu teléfono para hacer una llamada, pero sabes que tiene problemas de adicción a las redes sociales. ¿Qué haces?",
        opciones: [
            {
                texto: "Prestarle el teléfono y confiar en él",
                resultado: "Tu amigo hace la llamada, pero luego se distrae con las redes. Reflexión: La confianza es importante, pero también lo es establecer límites."
            },
            {
                texto: "Negarme a prestárselo y explicarle por qué",
                resultado: "Tu amigo se molesta, pero luego agradece tu preocupación. Reflexión: A veces, la honestidad puede ser difícil."
            },
            {
                texto: "Ofrecerle ayuda para superar su adicción",
                resultado: "Tu amigo acepta y empieza a trabajar en su problema. Reflexión: La amistad puede ser un gran apoyo en momentos difíciles."
            }
        ]
    }
    ,
    {
        titulo: "El dilema del consumo de carne",
        descripcion: "Te enteras de que la producción de carne tiene un gran impacto ambiental. ¿Qué haces?",
        opciones: [
            {
                texto: "Dejar de comer carne por completo",
                resultado: "Te sientes bien por tu decisión, pero extrañas algunos platos. Reflexión: Cambiar hábitos puede ser difícil, pero gratificante."
            },
            {
                texto: "Reducir el consumo de carne y buscar alternativas",
                resultado: "Encuentras nuevas recetas y te sientes más saludable. Reflexión: La moderación puede ser una buena opción."
            },
            {
                texto: "No cambiar nada, me gusta la carne",
                resultado: "Sigues disfrutando de tus comidas, pero te sientes culpable. Reflexión: A veces, es difícil enfrentar la realidad."
            }
        ]
    }
    ,
    {
        titulo: "El dilema del tiempo con la familia",
        descripcion: "Tienes un proyecto importante y tu familia quiere pasar tiempo contigo. ¿Qué haces?",
        opciones: [
            {
                texto: "Dedicar tiempo a mi familia y luego trabajar en el proyecto",
                resultado: "Tu familia se siente valorada y tú también. Reflexión: La calidad del tiempo es más importante que la cantidad."
            },
            {
                texto: "Decidir trabajar en el proyecto y no ver a mi familia",
                resultado: "Tu familia se siente decepcionada, pero el proyecto sale bien. Reflexión: A veces, las decisiones difíciles son necesarias."
            },
            {
                texto: "Buscar un equilibrio entre ambos",
                resultado: "Logras cumplir con tu proyecto y disfrutar de la compañía familiar. Reflexión: La moderación puede ser la clave para una vida equilibrada."
            }
        ]
    }
    ,
    {
        titulo: "El dilema del uso de plástico",
        descripcion: "Vas a comprar y ves que la tienda ofrece bolsas de plástico gratis. ¿Qué haces?",
        opciones: [
            {
                texto: "Usar una bolsa reutilizable",
                resultado: "Contribuyes a reducir el uso de plástico y te sientes bien. Reflexión: Las pequeñas acciones pueden tener un gran impacto."
            },
            {
                texto: "Aceptar la bolsa de plástico sin pensar en ello",
                resultado: "Disfrutas de la comodidad, pero contribuyes al problema del plástico. Reflexión: A veces, la ignorancia es más fácil."
            },
            {
                texto: "Hablar con el dueño de la tienda sobre el problema del plástico",
                resultado: "Generas conciencia, pero no cambias tu decisión. Reflexión: La conversación es importante, pero las acciones cuentan más."
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