const API_URL = "https://thesimpsonsapi.com/api/locations";
const contenedor = document.getElementById("contenedorUbicaciones");
const detalle = document.getElementById("detalleUbicacion");

// Cargar ubicaciones
async function cargarUbicaciones() {
    try {
        const respuesta = await fetch(API_URL);
        const data = await respuesta.json();
        const ubicaciones = data.slice(0, 10); // primeras 10

        contenedor.innerHTML = "";

        ubicaciones.forEach((ubi) => {
            const div = document.createElement("div");
            div.classList.add("tarjeta");

            // si tú insertas tus propias imágenes:
            const imgSrc = ubi.image_path || "imagenes/" + ubi.id + ".jpg";

            div.innerHTML = `
        <img src="${imgSrc}" alt="${ubi.name}">
        <h3>${ubi.name}</h3>
      `;

            div.addEventListener("click", () => mostrarDetalle(ubi, imgSrc));
            contenedor.appendChild(div);
        });
    } catch (error) {
        console.error("Error al cargar ubicaciones:", error);
    }
}

function mostrarDetalle(ubicacion, imgSrc) {
    detalle.classList.remove("oculto");

    detalle.innerHTML = `
    <div class="tarjeta-detalle">
      <h2>${ubicacion.name}</h2>
      <img src="${imgSrc}" alt="${ubicacion.name}">
      <p><strong>ID:</strong> ${ubicacion.id}</p>
      <p><strong>Ciudad:</strong> ${ubicacion.town || "Desconocida"}</p>
      <button class="boton-volver" onclick="cerrarDetalle()">Volver a la lista</button>
    </div>
  `;
}

function cerrarDetalle() {
    detalle.classList.add("oculto");
}

cargarUbicaciones();