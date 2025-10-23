// URL base de la API
const API_URL = "https://thesimpsonsapi.com/api/characters";

// Elementos del DOM
const contenedor = document.getElementById("personajes");
const btnAnterior = document.getElementById("anterior");
const btnSiguiente = document.getElementById("siguiente");
const paginaActual = document.getElementById("paginaActual");

// Páginas permitidas
const paginasPermitidas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let indicePagina = 0;

// Detectar si hay un ID en la URL
const params = new URLSearchParams(window.location.search);
const personajeId = params.get("id");

// Si hay un ID, mostrar personaje; si no, cargar lista
if (personajeId) {
    mostrarPersonaje(personajeId);
} else {
    cargarPersonajes(paginasPermitidas[indicePagina]);
}

// Cargar lista de personajes desde la API y mostrar imágenes del CDN
async function cargarPersonajes(pagina = 1) {
    try {
        const respuesta = await fetch(`${API_URL}?page=${pagina}`);
        if (!respuesta.ok) throw new Error("Error al obtener los datos de la API");

        const data = await respuesta.json();
        console.log(` Página ${pagina}:`, data);

        let personajes = [];
        if (Array.isArray(data)) personajes = data;
        else if (Array.isArray(data.characters)) personajes = data.characters;
        else if (Array.isArray(data.results)) personajes = data.results;
        else throw new Error("No se encontró la lista de personajes en la respuesta.");

        contenedor.innerHTML = "";
        paginaActual.textContent = `Página ${pagina}`;

        personajes.forEach(personaje => {
            const card = document.createElement("div");
            card.classList.add("card");

            // Siempre cargamos la imagen desde el CDN usando el ID
            const img = document.createElement("img");
            img.src = `https://cdn.thesimpsonsapi.com/200/character/${personaje.id}.webp`;
            img.alt = personaje.name || "Personaje sin nombre";
            img.classList.add("imagen-personaje");

            // Si hay error al cargar la imagen  usar una de respaldo
            img.onerror = () => {
                console.warn(` Imagen no encontrada para ID ${personaje.id}`);
                img.src = "https://cdn.thesimpsonsapi.com/200/character/default.webp";
            };

            // Click  Mostrar detalle
            img.addEventListener("click", () => mostrarPersonaje(personaje.id));

            const nombre = document.createElement("h3");
            nombre.textContent = personaje.name || "Sin nombre";

            card.appendChild(img);
            card.appendChild(nombre);
            contenedor.appendChild(card);
        });

        actualizarBotones();

    } catch (error) {
        console.error(" Error al cargar los personajes:", error);
        contenedor.innerHTML = `<p>No se pudieron cargar los personajes.</p><pre>${error.message}</pre>`;
    }
}


// Mostrar detalle del personaje con imagen desde el CDN
async function mostrarPersonaje(id) {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`);
        if (!respuesta.ok) throw new Error("Error al obtener el personaje");

        const data = await respuesta.json();
        const personaje = Array.isArray(data) ? data[0] : data;

        const portrit_path = `https://cdn.thesimpsonsapi.com/200/character/${personaje.id}.webp`;

        contenedor.innerHTML = `
    <div class="detalle-personaje">
        <img src="${portrit_path}" alt="${personaje.name}" class="imagen-detalle"
        onerror="this.src='https://cdn.thesimpsonsapi.com/200/character/default.webp'">
        <h2>${personaje.name || "Desconocido"}</h2>
        <p><strong>ID:</strong> ${personaje.id}</p>
        <p><strong>Edad:</strong> ${personaje.age || "No disponible"}</p>
        <p><strong>Fecha de nacimiento:</strong> ${personaje.birthdate || "No disponible"}</p>
        <p><strong>Género:</strong> ${personaje.gender || "Sin descripción"}</p>
        <p><strong>Ocupación:</strong> ${personaje.occupation|| "Sin descripción"}</p>
        <p><strong>Estado:</strong> ${personaje.status|| "Sin descripción"}</p>

        <button class="acordeon-btn">Descripción <i class="fa-solid fa-chevron-down"></i></button>
        <div class="acordeon-contenido">
            <p>${personaje.description || "Sin descripción disponible"}</p>
        </div>

        <button class="acordeon-btn">Frases <i class="fa-solid fa-chevron-down"></i></button>
        <div class="acordeon-contenido">
            <p>${personaje.phrases || "Sin frases disponibles"}</p>
        </div> 
        <br><br>
        <button onclick="window.location.href='personajes.html'" class="volver-btn">Volver a la lista</button>
    </div>
    `;

    // Ocultar botones de paginación mientras se muestra el detalle
    btnAnterior.style.display = "none";
    btnSiguiente.style.display = "none";
    paginaActual.style.display = "none";
    

        activarBotones();


    } catch (error) {
        console.error(" Error al cargar el personaje:", error);
        contenedor.innerHTML = `<p>No se pudo cargar el personaje.</p><pre>${error.message}</pre>`;
    }
}

// Acordeones
function activarBotones() {
    document.querySelectorAll(".acordeon-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const contenido = btn.nextElementSibling;
            const icono = btn.querySelector ("i");

            contenido.classList.toggle("mostrar");

            if(contenido.classList.contains("mostrar")){
                icono.classList.remove ("fa-chevron-down");
                icono.classList.add("fa-chevron-up");

            }else{
                icono.classList.remove("fa-chevron-up");
                icono.classList.add("fa-chevron-down");
            }

        });
    });
}

// Desactivar botones según la página actual 
function actualizarBotones() {
const index = indicePagina;

  btnAnterior.disabled = index === 0; // primera página
  btnSiguiente.disabled = index === paginasPermitidas.length - 1; // última página
}

// Paginación
btnSiguiente.addEventListener("click", () => {
    if (indicePagina < paginasPermitidas.length - 1) {
        indicePagina++;
        cargarPersonajes(paginasPermitidas[indicePagina]);
    }
});

btnAnterior.addEventListener("click", () => {
    if (indicePagina > 0) {
        indicePagina--;
        cargarPersonajes(paginasPermitidas[indicePagina]);
    }
});
cargarPersonajes()