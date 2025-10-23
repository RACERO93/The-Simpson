const API_URL = "https://thesimpsonsapi.com/api/locations";
const contenedor = document.getElementById("ubicaciones");
const detalle = document.getElementById("detalle-ubicacion");
const btnAnterior = document.getElementById("anterior");
const btnSiguiente = document.getElementById("siguiente");
const paginaActualSpan = document.getElementById("paginaActual");

// Páginas permitidas
const paginasPermitidas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let indicePagina = 0;
let paginaActual = paginasPermitidas[indicePagina];

// Cargar ubicaciones desde la API
async function cargarUbicaciones(pagina) {
  try {
    const respuesta = await fetch(`${API_URL}?page=${pagina}`);
    const data = await respuesta.json();
    console.log(`Página ${pagina}:`, data);

    const ubicaciones = Array.isArray(data)
      ? data
      : data.results || [];

    contenedor.innerHTML = "";

    ubicaciones.forEach((ubi) => {
      const card = document.createElement("div");
      card.classList.add("card-ubicacion");

      // Imagen desde CDN
      const img = document.createElement("img");
      img.src = `https://cdn.thesimpsonsapi.com/1280/location/${ubi.id}.webp`;
      img.alt = ubi.name || "Ubicación sin nombre";

      // Imagen de respaldo
      img.onerror = () => {
        img.src = "https://cdn.thesimpsonsapi.com/1280/location/default.webp";
      };

      const titulo = document.createElement("h3");
      titulo.textContent = ubi.name;

      // Al hacer clic, mostrar detalle
      card.addEventListener("click", () => mostrarDetalle(ubi));

      card.appendChild(img);
      card.appendChild(titulo);
      contenedor.appendChild(card);
    });

    // Mostrar número de página actual
    paginaActualSpan.textContent = `Página ${pagina}`;

    // Actualizar el estado de los botones
    actualizarBotones();

  } catch (error) {
    console.error("Error al cargar ubicaciones:", error);
    contenedor.innerHTML = `<p>No se pudieron cargar las ubicaciones.</p>`;
  }
}

// Mostrar detalle de una ubicación
function mostrarDetalle(ubi) {
  const image_path = `https://cdn.thesimpsonsapi.com/1280/location/${ubi.id}.webp`;

  detalle.innerHTML = `
    <div class="tarjeta-detalle">
      <h2>${ubi.name}</h2>
      <img src="${image_path}" alt="${ubi.name}"
            onerror="this.src='https://cdn.thesimpsonsapi.com/1280/location/default.webp'">
      <p><strong>ID:</strong> ${ubi.id}</p>
      <p><strong>Ciudad:</strong> ${ubi.town || "Desconocida"}</p>
      <p><strong>Uso:</strong> ${ubi.use || "Desconocido"}</p>
      <button id="cerrarDetalle" class="boton-cerrar">Cerrar</button>
  </div>
  `;

  detalle.style.display = "flex";

  // Ocultar botones de paginación mientras se muestra el detalle
  btnAnterior.style.display = "none";
  btnSiguiente.style.display = "none";
  paginaActualSpan.style.display = "none";

  document.getElementById("cerrarDetalle").addEventListener("click", () => {
    cerrarDetalle();
  });
}

// Cerrar detalle y restaurar botones
function cerrarDetalle() {
  detalle.style.display = "none";
  btnAnterior.style.display = "inline-block";
  btnSiguiente.style.display = "inline-block";
  paginaActualSpan.style.display = "inline-block";
}

// Desactivar botones según la página actual
function actualizarBotones() {
  const index = paginasPermitidas.indexOf(paginaActual);

  btnAnterior.disabled = index === 0; // primera página
  btnSiguiente.disabled = index === paginasPermitidas.length - 1; // última página
}

// Paginación
btnAnterior.addEventListener("click", () => {
  if (indicePagina > 0) {
    indicePagina--;
    paginaActual = paginasPermitidas[indicePagina];
    cargarUbicaciones(paginaActual);
  }
});

btnSiguiente.addEventListener("click", () => {
  if (indicePagina < paginasPermitidas.length - 1) {
    indicePagina++;
    paginaActual = paginasPermitidas[indicePagina];
    cargarUbicaciones(paginaActual);
  }
});

// Carga inicial
cargarUbicaciones(paginaActual);