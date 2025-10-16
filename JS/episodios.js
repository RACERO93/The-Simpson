const API_URL = "https://thesimpsonsapi.com/api/episodes";
const contenedor = document.getElementById("episodios");
const detalleContenedor = document.getElementById("detalle-episodio");

// Mapa de imágenes por nombre de episodio
const imagenesPorEpisodio = {
  "Simpsons Roasting on an Open Fire": "https://cdn.thesimpsonsapi.com/200/episode/1.webp",
  "Bart the Genius": "https://cdn.thesimpsonsapi.com/200/episode/2.webp",
  "Homer's Odyssey": "https://cdn.thesimpsonsapi.com/200/episode/3.webp",
  "There's No Disgrace Like Home": "https://cdn.thesimpsonsapi.com/200/episode/4.webp",
  "Bart the General": "https://cdn.thesimpsonsapi.com/200/episode/5.webp",
  "Moaning Lisa": "https://cdn.thesimpsonsapi.com/200/episode/6.webp",
  "The Call of the Simpsons": "https://cdn.thesimpsonsapi.com/200/episode/7.webp",
  "The Telltale Head": "https://cdn.thesimpsonsapi.com/200/episode/8.webp",
  "Life on the Fast Lane": "https://cdn.thesimpsonsapi.com/200/episode/9.webp",
  "Homer's Night Out": "https://cdn.thesimpsonsapi.com/200/episode/10.webp",
  "The Crepes of Wrath" : "https://cdn.thesimpsonsapi.com/200/episode/11.webp",
  "Krusty Gets Busted" : "https://cdn.thesimpsonsapi.com/200/episode/12.webp",
  "Some Enchanted Evening" : "https://cdn.thesimpsonsapi.com/200/episode/13.webp",
  "Bart Gets an 'F'" : "https://cdn.thesimpsonsapi.com/200/episode/14.webp",
  "Simpson and Delilah" : "https://cdn.thesimpsonsapi.com/200/episode/15.webp",
  "Treehouse of Horror" : "https://cdn.thesimpsonsapi.com/200/episode/16.webp",
  "Two Cars in Every Garage and Three Eyes on Every Fish" : "https://cdn.thesimpsonsapi.com/200/episode/17.webp",
  "Dancin' Homer" : "https://cdn.thesimpsonsapi.com/200/episode/18.webp",
  "Dead Putting Society" : "https://cdn.thesimpsonsapi.com/200/episode/19.webp",
  "Bart vs. Thanksgiving" : "https://cdn.thesimpsonsapi.com/200/episode/20.webp",
};

// Función principal
async function cargarEpisodios() {
  try {
    const respuesta = await fetch(API_URL);
    const data = await respuesta.json();
    const episodios = Array.isArray(data) ? data.slice(0, 20) : data.results.slice(0, 20);

    contenedor.innerHTML = "";

    episodios.forEach(ep => {
      const card = document.createElement("div");
      card.classList.add("card-episodio");

      const img = document.createElement("img");
      img.src = imagenesPorEpisodio[ep.name] || ep.imagePath || "../Episodio/default.jpg";
      img.alt = ep.name;

      const titulo = document.createElement("h3");
      titulo.textContent = ep.name;

      card.appendChild(img);
      card.appendChild(titulo);

      // Evento al hacer clic en la imagen
      card.addEventListener("click", () => mostrarDetalle(ep));

      contenedor.appendChild(card);
    });

    console.log(" Episodios cargados:", episodios);
  } catch (error) {
    console.error(" Error al cargar los episodios:", error);
  }
}

// Mostrar detalle dentro de un bloque tipo modal
function mostrarDetalle(ep) {
  detalleContenedor.innerHTML = `
    <div class="tarjeta-detalle">
    <h2>${ep.name}</h2> <br>
      <img src="${imagenesPorEpisodio[ep.name] || ep.imagePath }" alt="${ep.name}">     
      <p><strong>ID:</strong> ${ep.id}</p>
      <p><strong>Fecha:</strong> ${ep.airdate}</p>
      <p><strong>Temporada:</strong> ${ep.season}</p>
      <p><strong>Episodio #:</strong> ${ep.episode_number}</p>
      <p><strong>Sinopsis:</strong> ${ep.synopsis || "Sin descripción disponible."}</p>
      <button id="cerrarDetalle">Cerrar</button>
    </div>
  `;

  detalleContenedor.style.display = "flex";

  // Cerrar al hacer clic en el botón
  document.getElementById("cerrarDetalle").addEventListener("click", () => {
    detalleContenedor.style.display = "none";
  });

  console.log(" Detalle del episodio:", ep);
}

// Iniciar carga
cargarEpisodios();
