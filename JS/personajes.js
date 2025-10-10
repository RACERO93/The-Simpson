// URL base de la API
const API_URL = "https://thesimpsonsapi.com/api/characters";

// Contenedor principal
const contenedor = document.getElementById("personajes");

// Detectar si hay un ID en la URL (para mostrar un solo personaje)
const params = new URLSearchParams(window.location.search);
const personajeId = params.get("id");

// Si hay un ID, mostrar personaje; si no, cargar lista completa
if (personajeId) {
    mostrarPersonaje(personajeId);
} else {
    cargarPersonajes();
}

// Asignación imágenes por nombre
const imagenesPorNombre = {
    "Homer Simpson": "../Imagenes/personajes/Homero.png",
    "Marge Simpson": "../Imagenes/personajes/Marge.png",
    "Bart Simpson": "../Imagenes/personajes/Bart.png",
    "Lisa Simpson": "../Imagenes/personajes/Lisa.png",
    "Maggie Simpson": "../Imagenes/personajes/Maggie.png",
    "Abe Simpson II": "../Imagenes/personajes/Abe.png",
    "Milhouse Van Houten": "../Imagenes/personajes/Milhouse.jpg",
    "Patty Bouvier": "../Imagenes/personajes//Patty.jpg",
    "Selma Bouvier": "../Imagenes/personajes/Selma.png",
    "Ned Flanders": "../Imagenes/personajes/Ned.jpg",
    "Maude Flanders": "../Imagenes/personajes/Maude.png",
    "Rod Flanders": "../Imagenes/personajes/Rod.png",
    "Todd Flanders": "../Imagenes/personajes/todd.png",
    "Charles Montgomery Burns": "../Imagenes/personajes/Burns.jpg",
    "Waylon Smithers, Jr.": "../Imagenes/personajes/Smithers.png",
    "Krusty the Clown": "../Imagenes/personajes/Krusty.png",
    "Moe Szyslak": "../Imagenes/personajes/Moe.jpg",
    "Apu Nahasapeemapetilon": "../Imagenes/personajes/Apu.png",
    "Chief Wiggum": "../Imagenes/personajes/Wiggum.jpg",
    "Seymour Skinner": "../Imagenes/personajes/Skinner.jpg",
    "Gary Chalmers" : "../Imagenes/personajes/Gary.png",
    "Edna Krabappel" : "../Imagenes/personajes/Edna.png"
};

// Imagen por defecto (por si no hay coincidencia)
// const imagenDefault = "../Imagenes/default.png";

// Función para cargar y mostrar todos los personajes
async function cargarPersonajes() {
    try {
        const respuesta = await fetch(API_URL);
        if (!respuesta.ok) throw new Error("Error al obtener los datos de la API");
        const data = await respuesta.json();

        console.log("Respuesta completa:", data);

        let personajes = [];
        if (Array.isArray(data)) {
            personajes = data;
        } else if (Array.isArray(data.characters)) {
            personajes = data.characters;
        } else if (Array.isArray(data.results)) {
            personajes = data.results;
        } else {
            throw new Error("No se encontro la lista de personajes en la respuesta.");
        }

        // Limpiar el contenedor
        contenedor.innerHTML = "";

        // Mostrar personajes
        personajes.forEach(personaje => {
            const card = document.createElement("div");
            card.classList.add("card");

            const img = document.createElement("img");

            // Buscar imagen por nombre
            const imagenAsignada = imagenesPorNombre[personaje.name] || personaje.image
            img.src = imagenAsignada;

            img.alt = personaje.name || "Personaje";
            img.classList.add("imagen-personaje");

            // Al hacer clic, mostrar detalles del personaje
            img.addEventListener("click", () => mostrarPersonaje(personaje.id));

            const nombre = document.createElement("h3");
            nombre.textContent = personaje.name || "Sin nombre";

            card.appendChild(img);
            card.appendChild(nombre);
            contenedor.appendChild(card);
        });
    } catch (error) {
        console.error("Error al cargar los personajes:", error);
        contenedor.innerHTML = `
    <p>No se pudieron cargar los personajes</p>
    <pre>${error.message}</pre>
`;
    }
}

// Función para mostrar un personaje en detalle
async function mostrarPersonaje(id) {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`);
        if (!respuesta.ok) throw new Error("Error al obtener el personaje");
        const data = await respuesta.json();

        console.log("Detalle personaje:", data);

        const personaje = Array.isArray(data) ? data[0] : data;

        // Usar imagen asignada si existe
        const imagenAsignada = imagenesPorNombre[personaje.name] || personaje.image || imagenDefault;

        contenedor.innerHTML = `
        <div class="detalle-personaje">
            <img src="${imagenAsignada}" alt="${personaje.name}" class="imagen-detalle">
            <h2>${personaje.name || "Desconocido"}</h2>
            <p><strong>Edad:</strong> ${personaje.age || "No disponible"}</p>
            <p><strong>Fecha de nacimiento:</strong> ${personaje.birthdate || "No disponible"}</p>
            <p><strong>Ocupación:</strong> ${personaje.occupation || "No disponible"}</p>
            <p><strong>Genero:</strong> ${personaje.gender|| "Sin descripción"}</p>
            <p><strong>Descripción:</strong> ${personaje.description || "Sin descripción"}</p>            
            <button onclick="window.location.href='personajes.html'" class="volver-btn">Volver a la lista</button>
        </div>
    `;
    } catch (error) {
        console.error("Error al cargar el personaje:", error);
        contenedor.innerHTML = `
<p>No se pudo cargar el personaje</p>
<pre>${error.message}</pre>
`;
    }
}