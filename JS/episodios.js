const API_URL = "https://thesimpsonsapi.com/api/episodes";

// Elementos del DOM
const contenedor = document.getElementById("episodios");
const detalleContenedor = document.getElementById("detalle-episodio");
const volverBtn = document.getElementById("volver");
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");
const paginaActualSpan = document.getElementById("paginaActual");

// Configuración de páginas   
const paginasPermitidas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 25]; //este array solo permite el llamada de las págias asignadas
let indicePagina = 0;   // Guarda la possicion actaul dentro del arreglo que corresponde a la página #1
let paginaActual = paginasPermitidas[indicePagina]; //se toma el valor que esta en la paginaActual oseaa pagina #1
const episodiosPorPagina = 20;   //el llamado de cada episodio


// Videos personalizados
const videoPerzonalizado = {
  "Simpsons Roasting on an Open Fire": "../Imagenes/videos/navidad.mp4",
  "Bart the Genius": "../Imagenes/videos/Bart.mp4",
  "Homer's Odyssey": "../Imagenes/videos/Odyssey.mp4",
  "There's No Disgrace Like Home": "../Imagenes/videos/Disgrace.mp4",
  "Bart the General": "../Imagenes/videos/General.mp4",
  "Moaning Lisa": "../Imagenes/videos/Moaning.mp4",
};

// Cargar episodios desde la API
async function cargarEpisodios(pagina = 1) {
  try {
    const respuesta = await fetch(`${API_URL}?page=${pagina}`);
    const data = await respuesta.json();
    console.log(`Página ${pagina}:`, data);

    const episodios = Array.isArray(data) //si data es un arreglo, guarda data en en la variable de episodios. si no, guarda un array vacio.,
      ? data.slice(0, episodiosPorPagina) // toma los primros episodios que estan definifo en la variable y muetras la cantidad de episodio por pagina
      : data.results.slice(0, episodiosPorPagina);    //toma los primeroe elementos del array data.results y lo pone en un nuevo arreglo ( slice= inicio,fin)


    contenedor.innerHTML = "";

    episodios.forEach((ep) => {
      const card = document.createElement("div");
      card.classList.add("card-episodio"); //elemento card agrega una clase de CSS par que tome los estilos definido

      // Imagen desde CDN según ID
      const img = document.createElement("img");
      img.src = `https://cdn.thesimpsonsapi.com/200/episode/${ep.id}.webp`;
      img.alt = ep.name || "Episodio sin título";
      img.onerror = () => {
        img.src = "https://cdn.thesimpsonsapi.com/200/episode/default.webp";
      };

      const titulo = document.createElement("h3");
      titulo.textContent = ep.name;

      // Video personalizado
      if (videoPerzonalizado[ep.name]) {
        img.style.cursor = "pointer";
        img.addEventListener("click", () => {
          const video = document.createElement("video");
          video.src = videoPerzonalizado[ep.name];
          video.controls = true;
          video.autoplay = true;
          video.style.width = "100%";
          video.style.borderRadius = "10px";

          card.innerHTML = "";
          card.appendChild(video);

          video.addEventListener("ended", () => {
            card.innerHTML = ""; // Limpia el contenido del video
            card.appendChild(img);//vuelve a poner la imagen original
            card.appendChild(titulo);  // Vuelve a ponel el titulo

          });
        });
      } else {
        card.addEventListener("click", () => mostrarDetalle(ep));
      }

      card.appendChild(img);
      card.appendChild(titulo);
      contenedor.appendChild(card);
    });

    paginaActualSpan.textContent = `Página ${pagina}`;

    // Actualizar botones después de cargar la página
    actualizarBotones();

  } catch (error) {
    console.error("Error al cargar episodios:", error);
  }
}

// Mostrar detalle del episodio (modal)
function mostrarDetalle(ep) {
  const image_path = `https://cdn.thesimpsonsapi.com/200/episode/${ep.id}.webp`;

  detalleContenedor.innerHTML = `
    <div class="tarjeta-detalle">
      <h2>${ep.name}</h2>
      <img src="${image_path}" alt="${ep.name}"
          onerror="this.src='https://cdn.thesimpsonsapi.com/200/episode/default.webp'">
      <p><strong>ID:</strong> ${ep.id || "No disponible"}</p>
      <p><strong>Fecha:</strong> ${ep.airdate || "No disponible"}</p>
      <p><strong>Episodio #:</strong> ${ep.episode_number || "?"}</p>
      <p><strong>Temporada:</strong> ${ep.season || "?"}</p>
      <p><strong>Sinopsis:</strong> ${ep.synopsis || "Sin descripción disponible."}</p>
      <button id="cerrarDetalle" class="btn-volver">Cerrar</button>
    </div>
  `;

  detalleContenedor.style.display = "flex";

  // Ocultar botones de paginación mientras se muestra el detalle
  btnAnterior.style.display = "none";
  btnSiguiente.style.display = "none";
  paginaActualSpan.style.display = "none";

  document.getElementById("cerrarDetalle").addEventListener("click", () => {
    detalleContenedor.style.display = "none";

    
    // Mostrar botones nuevamente al cerrar
    btnAnterior.style.display = "inline-block";
    btnSiguiente.style.display = "inline-block";
    paginaActualSpan.style.display = "inline-block";
  });
}

// Función para desactivar botones según la página actual
function actualizarBotones() {
  const index = paginasPermitidas.indexOf(paginaActual);

  // Si estás en la primera página  desactivar "Anterior"
  btnAnterior.disabled = index === 0;

  // Si estás en la última página  desactivar "Siguiente"
  btnSiguiente.disabled = index === paginasPermitidas.length - 1;
}

// Paginación
btnAnterior.addEventListener("click", () => {
  if (indicePagina > 0) {
    indicePagina--;
    paginaActual = paginasPermitidas[indicePagina];
    cargarEpisodios(paginaActual);
  }
});

btnSiguiente.addEventListener("click", () => {
  if (indicePagina < paginasPermitidas.length - 1) {
    indicePagina++;
    paginaActual = paginasPermitidas[indicePagina];
    cargarEpisodios(paginaActual);
  }
});

// Botón “Volver” del modal
volverBtn.addEventListener("click", () => {
  detalleContenedor.style.display = "none";
});

// Cargar primera página
cargarEpisodios(paginaActual);