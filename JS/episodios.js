const API_URL = "https://thesimpsonsapi.com/api/episodes";
const contenedor = document.getElementById("episodios");
const detalleContenedor = document.getElementById("detalle-episodio");

// Mapa de imágenes por nombre de episodio
const imagenesPorEpisodio = {
  "Simpsons Roasting on an Open Fire": "../Episodios/Incendio.jpg",
  "Bart the Genius": "../Episodios/Bart.jpg",
  "Homer's Odyssey": "../Episodios/Odyssey.jpg",
  "There's No Disgrace Like Home": "../Episodios/family.jpg",
  "Bart the General": "../Episodios/BartGeneral.jpg",
  "Moaning Lisa": "../Episodios/Quejandose.jpg",
  "The Call of the Simpsons": "../Episodios/CallSimpsons.jpg",
  "The Telltale Head": "../Episodios/TelltaleHead.jpg",
  "Life on the Fast Lane": "../Episodios/FastLane.jpg",
  "Homer's Night Out": "../Episodios/HomerNight.jpg",
  "The Crepes of Wrath": "../Episodios/CrepesWrath.jpg",
  "Krusty Gets Busted": "../Episodios/GetsdBusted.jpg",

};

// Función principal
async function cargarEpisodios() {
  try {
    const respuesta = await fetch(API_URL);
    const data = await respuesta.json();
    const episodios = Array.isArray(data) ? data.slice(0, 10) : data.results.slice(0, 10);

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
      <img src="${imagenesPorEpisodio[ep.name] || ep.imagePath || '../Episodio/default.jpg'}" alt="${ep.name}">
      <h2>${ep.name}</h2>
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
