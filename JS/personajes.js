// URL base de la API
const API_URL = "https://thesimpsonsapi.com/api/characters";

// Elementos del DOM
const contenedor = document.getElementById("personajes");
const btnAnterior = document.getElementById("anterior");
const btnSiguiente = document.getElementById("siguiente");
const paginaActual = document.getElementById("paginaActual");

// Páginas que se mostrar (personalizadas) en pantalla 
const paginasPermitidas = [1, 2, 5];
let indicePagina = 0; // empieza en la primera página

// Detectar si hay un ID en la URL
const params = new URLSearchParams(window.location.search);  // Mira los datos que tiene la url y los organiza para poder leerlo 
const personajeId = params.get("id");  // saca el valor del dato que quieres ( por ejemploo un id nombre etc.. de un personaje ) con el get 
console.log(personajeId)

// Si hay un ID, mostrar un personaje; si no, cargar la lista
if (personajeId) {
    mostrarPersonaje(personajeId);
} else {
    cargarPersonajes(paginasPermitidas[indicePagina]);
}


// Asignación de imágenes por nombre desde la api
const imagenesPorNombre = { 
    // página 1

    "Homer Simpson": "https://cdn.thesimpsonsapi.com/200/character/1.webp",
    "Marge Simpson": "https://cdn.thesimpsonsapi.com/200/character/2.webp",
    "Bart Simpson": "https://cdn.thesimpsonsapi.com/200/character/3.webp",
    "Lisa Simpson": "https://cdn.thesimpsonsapi.com/200/character/4.webp",
    "Maggie Simpson": "https://cdn.thesimpsonsapi.com/200/character/5.webp",
    "Abe Simpson II": "https://cdn.thesimpsonsapi.com/200/character/6.webp",
    "Patty Bouvier": "https://cdn.thesimpsonsapi.com/200/character/7.webp",
    "Selma Bouvier": "https://cdn.thesimpsonsapi.com/200/character/8.webp",
    "Ned Flanders": "https://cdn.thesimpsonsapi.com/200/character/9.webp",
    "Maude Flanders": "https://cdn.thesimpsonsapi.com/200/character/10.webp",
    "Rod Flanders": "https://cdn.thesimpsonsapi.com/200/character/11.webp",
    "Todd Flanders": "https://cdn.thesimpsonsapi.com/200/character/12.webp",
    "Charles Montgomery Burns": "https://cdn.thesimpsonsapi.com/200/character/13.webp",
    "Waylon Smithers, Jr.": "https://cdn.thesimpsonsapi.com/200/character/14.webp",
    "Krusty the Clown": "https://cdn.thesimpsonsapi.com/200/character/15.webp",
    "Moe Szyslak": "https://cdn.thesimpsonsapi.com/200/character/16.webp",
    "Apu Nahasapeemapetilon": "https://cdn.thesimpsonsapi.com/200/character/17.webp",
    "Seymour Skinner": "https://cdn.thesimpsonsapi.com/200/character/18.webp",
    "Gary Chalmers": "https://cdn.thesimpsonsapi.com/200/character/19.webp",
    "Edna Krabappel": "https://cdn.thesimpsonsapi.com/200/character/20.webp",

    //        página 2

    "Otto Mann" : "https://cdn.thesimpsonsapi.com/200/character/21.webp",
    "Milhouse Van Houten": "https://cdn.thesimpsonsapi.com/200/character/22.webp",
    "Luann Van Houten"  : "https://cdn.thesimpsonsapi.com/200/character/23.webp",
    "Kirk Van Houten" : "https://cdn.thesimpsonsapi.com/200/character/24.webp",
    "Ralph Wiggum" : "https://cdn.thesimpsonsapi.com/200/character/25.webp",
    "Barney Gumble" : "https://cdn.thesimpsonsapi.com/200/character/26.webp",
    "Carl Carlson" : "https://cdn.thesimpsonsapi.com/200/character/27.webp",
    "Lenny Leonard" : "https://cdn.thesimpsonsapi.com/200/character/28.webp",
    "Clancy Wiggum" : "https://cdn.thesimpsonsapi.com/200/character/29.webp",
    "Sarah Wiggum" : "https://cdn.thesimpsonsapi.com/200/character/30.webp",
    "Julius Hibbert" : "https://cdn.thesimpsonsapi.com/200/character/31.webp",
    "Lou": "https://cdn.thesimpsonsapi.com/200/character/32.webp",
    "Jonathan Frink, Jr."  : "https://cdn.thesimpsonsapi.com/200/character/33.webp",
    "Professor Frink's son" : "https://cdn.thesimpsonsapi.com/200/character/34.webp",
    "Robert Terwilliger" : "https://cdn.thesimpsonsapi.com/200/character/35.webp",
    "Martin Prince, Jr." : "https://cdn.thesimpsonsapi.com/200/character/36.webp",
    "Nelson Muntz" : "https://cdn.thesimpsonsapi.com/200/character/37.webp",
    "Jimbo Jones" : "https://cdn.thesimpsonsapi.com/200/character/38.webp",
    "Kearney Zzyzwicz" : "https://cdn.thesimpsonsapi.com/200/character/39.webp",
    "Dolph Starbeam" : "https://cdn.thesimpsonsapi.com/200/character/40.webp",

    //      página 5
    
    "Rainier Wolfcastle" : "https://cdn.thesimpsonsapi.com/200/character/81.webp",
    "Frank Grimes": "https://cdn.thesimpsonsapi.com/200/character/82.webp",
    "Blue-Haired Lawyer"  : "https://cdn.thesimpsonsapi.com/200/character/83.webp",
    "Richard Texan" : "https://cdn.thesimpsonsapi.com/200/character/84.webp",
    "Charlie (SNPP)" : "https://cdn.thesimpsonsapi.com/200/character/85.webp",
    "Manjula Nahasapeemapetilon" : "https://cdn.thesimpsonsapi.com/200/character/86.webp",
    "Wendell Borton" : "https://cdn.thesimpsonsapi.com/200/character/87.webp",
    "Laura Powers" : "https://cdn.thesimpsonsapi.com/200/character/88.webp",
    "Grandpa Van Houten" : "https://cdn.thesimpsonsapi.com/200/character/89.webp",
    "Eleanor Abernathy" : "https://cdn.thesimpsonsapi.com/200/character/90.webp",
    "Lurleen Lumpkin" : "https://cdn.thesimpsonsapi.com/200/character/91.webp",
    "Jesus Christ": "https://cdn.thesimpsonsapi.com/200/character/92.webp",
    "Rex Banner"  : "https://cdn.thesimpsonsapi.com/200/character/93.webp",
    "Wally Kogen" : "https://cdn.thesimpsonsapi.com/200/character/94.webp",
    "L.T. Smash" : "https://cdn.thesimpsonsapi.com/200/character/95.webp",
    "Vittorio DiMaggio" : "https://cdn.thesimpsonsapi.com/200/character/96.webp",
    "Kang" : "https://cdn.thesimpsonsapi.com/200/character/97.webp",
    "Richard" : "https://cdn.thesimpsonsapi.com/200/character/98.webp",
    "Harlan Dondelinger" : "https://cdn.thesimpsonsapi.com/200/character/99.webp",
    "Alice Glick" : "https://cdn.thesimpsonsapi.com/200/character/100.webp",

}


// Función para cargar los personajes en la lista 
async function cargarPersonajes(pagina = 1) {
    try {    // 
        const respuesta = await fetch(`${API_URL}?page=${pagina}`);
        if (!respuesta.ok) throw new Error("Error al obtener los datos de la API");

        const data = await respuesta.json();
        console.log(` Página ${pagina}:`, data);


        // esta condicion permiten que el codigo  funcione aunque la api devuelva los datos en distitas estructuras 

        let personajes = [];  //se crea un arreglo vacio para guardar los personajes 

        // verifica donde este el array de personaje en la repuesta 
        if (Array.isArray(data)) {
            personajes = data;  // si ya es un array lo asigna diresctamente a la variable personaje 
        } else if (Array.isArray(data.characters)) { 
            personajes = data.characters; // busca si existe un array 
        } else if (Array.isArray(data.results)) { 
            personajes = data.results;
        } else { //si ninguna condicion anterior cumple, lanza un error 
            throw new Error("No se encontró la lista de personajes en la respuesta.");
        }

        contenedor.innerHTML = "";
        paginaActual.textContent = `Página ${pagina}`;

        

        personajes.forEach(personaje => {
            const card = document.createElement("div");
            card.classList.add("card");

            const img = document.createElement("img");
            const imagenAsignada = imagenesPorNombre[personaje.name] || personaje.image;
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
        contenedor.innerHTML = `<p>No se pudieron cargar los personajes</p><pre>${error.message}</pre>`;
    }
}

// Mostrar un personaje específico
async function mostrarPersonaje(id) {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`);
        if (!respuesta.ok) throw new Error("Error al obtener el personaje");

        const data = await respuesta.json();
        console.log(" Detalle personaje:", data);

        const personaje = Array.isArray(data) ? data[0] : data;
        const imagenAsignada = imagenesPorNombre[personaje.name] || personaje.image;

        contenedor.innerHTML = `
            <div class="detalle-personaje"  class="ocultar">
                <img src="${imagenAsignada}" alt="${personaje.name}" class="imagen-detalle">
                <h2>${personaje.name || "Desconocido"}</h2>
                <p><strong>ID:</strong> ${personaje.id || "No disponible"}</p>
                <p><strong>Edad:</strong> ${personaje.age || "No disponible"}</p>
                <p><strong>Fecha de nacimiento:</strong> ${personaje.birthdate || "No disponible"}</p>
                <p><strong>Género:</strong> ${personaje.gender || "Sin descripciónn }"}</p>
                <button class="acordeon-btn"> Descripción <i class="fa-solid fa-chevron-down"></i>  </button>       <!--  Sección desplegable de descripción -->
            <div class="acordeon-contenido">
                <p><strong>Descripción:</strong> ${personaje.description || "Sin descripción"}</p>
            </div>
                <p><strong>Ocupación:</strong> ${personaje.occupation || "No disponible"}</p>
                <button class="acordeon-btn"> Frases <i class="fa-solid fa-chevron-down"></i>  </button></button>                    <!--  Sección desplegable de frases -->
            <div class="acordeon-contenido">
                <p><strong>Frases:</strong> ${personaje.phrases || "Sin descripción"}</p>
        
            </div>
            <br> <br>
                <button onclick="window.location.href='personajes.html'" class="volver-btn">Volver a la lista</button>
            </div>
    

    
        `;




    function activarBotones () {
    document.querySelectorAll(".acordeon-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        const contenido = btn.nextElementSibling;
        contenido.classList.toggle("mostrar");
    });
    });
}
    activarBotones ()
    } catch (error) {
        console.error("Error al cargar el personaje:", error);
        contenedor.innerHTML = `<p>No se pudo cargar el personaje</p><pre>${error.message}</pre>`;
    }


}

// funcion del boton de las páginas 
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


    
