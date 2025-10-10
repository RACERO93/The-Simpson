const API_URL = "https://thesimpsonsapi.com/api/locations";
const contenedor = document.getElementById("ubicaciones");
const detalle = document.getElementById("detalle-ubicacion");

// Mapa de imágenes (tú insertas tus rutas locales)
const imagenesPorUbicacion = {
  "742 Evergreen Terrace": "../Imagenes/Ubicacion/Evergreen.jpg",
  "Springfield Nuclear Power Plant": "../Imagenes/Ubicacion/Nuclear.jpg",
  "Springfield Elementary School": "../Imagenes/Ubicacion/School.jpg",
  "Kwik-E-Mart": "../Imagenes/Ubicacion/Kwik-E-Mart.jpg",
  "Moe's Tavern": "../Imagenes/Ubicacion/tavern.jpg",
  "Springfield General Hospital": "../Imagenes/Ubicacion/Hospital.jpg",
  "Springfield Town Square": "../Imagenes/Ubicacion/Square.jpg",
  "Springfield Police Station": "../Imagenes/Ubicacion/police.jpg",
  "Springfield Cemetery": "../Imagenes/Ubicacion/Cementery.jpg",
  "Springfield Retirement Castle": "../Imagenes/Ubicacion/Castle.jpg",
  "Krustylu Studios" : "../Imagenes/Ubicacion/",
};

// Cargar ubicaciones
async function cargarUbicaciones() {
  try {
    const respuesta = await fetch(API_URL);
    const data = await respuesta.json();
    const ubicaciones = Array.isArray(data) ? data.slice(0, 10) : data.results.slice(0, 10);

    contenedor.innerHTML = "";

    ubicaciones.forEach((ubi) => {
      const card = document.createElement("div");
      card.classList.add("card-ubicacion");

      const img = document.createElement("img");
      img.src = imagenesPorUbicacion[ubi.name] || "../Ubicaciones/default.jpg";
      img.alt = ubi.name;

      const titulo = document.createElement("h3");
      titulo.textContent = ubi.name;

      card.appendChild(img);
      card.appendChild(titulo);
      card.addEventListener("click", () => mostrarDetalle(ubi));

      contenedor.appendChild(card);
    });

    console.log(" Ubicaciones cargadas:", ubicaciones);
  } catch (error) {
    console.error(" Error al cargar las ubicaciones:", error);
  }
}

// Mostrar detalle
function mostrarDetalle(ubi) {
  const imgSrc = imagenesPorUbicacion[ubi.name] || "../Ubicaciones/default.jpg";

  detalle.innerHTML = `
    <div class="tarjeta-detalle">
      <h2>${ubi.name}</h2>
      <img src="${imgSrc}" alt="${ubi.name}">
      <p><strong>ID:</strong> ${ubi.id}</p>
      <p><strong>Ciudad:</strong> ${ubi.town || "Desconocida"}</p>
      <p><strong>Lugar:</strong> ${ubi.use || "Desconocida"}</p>
      <button class="boton-cerrar" onclick="cerrarDetalle()">Cerrar</button>
    </div>
  `;
  detalle.style.display = "flex";
}

// Cerrar detalle
function cerrarDetalle() {
  detalle.style.display = "none";
}

cargarUbicaciones();
