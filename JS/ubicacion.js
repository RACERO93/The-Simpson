const API_URL = "https://thesimpsonsapi.com/api/locations";
const contenedor = document.getElementById("ubicaciones");
const detalle = document.getElementById("detalle-ubicacion");
const btnAnterior = document.getElementById("anterior");
const btnSiguiente = document.getElementById("siguiente");
const paginaActual = document.getElementById("paginaActual");

// Solo se permiten las páginas 1, 2 y 3
const paginasPermitidas = [1, 2, 3];
let pagina = 1;

// insertacion de imagenes
const imagenesPorUbicacion = {

// Página # 1

  "742 Evergreen Terrace": "https://cdn.thesimpsonsapi.com/200/location/1.webp",
  "Springfield Nuclear Power Plant": "https://cdn.thesimpsonsapi.com/200/location/2.webp",
  "Springfield Elementary School": "https://cdn.thesimpsonsapi.com/200/location/3.webp",
  "Kwik-E-Mart": "https://cdn.thesimpsonsapi.com/200/location/4.webp",
  "Moe's Tavern": "https://cdn.thesimpsonsapi.com/200/location/5.webp",
  "Springfield General Hospital": "https://cdn.thesimpsonsapi.com/200/location/6.webp",
  "Springfield Town Square": "https://cdn.thesimpsonsapi.com/200/location/7.webp",
  "Springfield Police Station": "https://cdn.thesimpsonsapi.com/200/location/8.webp",
  "Springfield Cemetery": "https://cdn.thesimpsonsapi.com/200/location/9.webp",
  "Springfield Retirement Castle": "https://cdn.thesimpsonsapi.com/200/location/10.webp",
  "Krusty Burger" :"https://cdn.thesimpsonsapi.com/200/location/11.webp",
  "Krustylu Studios": "https://cdn.thesimpsonsapi.com/200/location/12.webp",
  "Springfield Penitentiary" : "https://cdn.thesimpsonsapi.com/200/location/13.webp",
  "Springfield Mall" : "https://cdn.thesimpsonsapi.com/200/location/14.webp",
  "Duff Brewery" : "https://cdn.thesimpsonsapi.com/200/location/15.webp",
  "First Church of Springfield" : "https://cdn.thesimpsonsapi.com/200/location/16.webp",
  "Springfield City Zoo" : "https://cdn.thesimpsonsapi.com/200/location/17.webp",
  "The Android's Dungeon & Baseball Card Shop" : "https://cdn.thesimpsonsapi.com/200/location/18.webp",
  "Burns Manor" : "https://cdn.thesimpsonsapi.com/200/location/19.webp",
  "Capital City" : "https://cdn.thesimpsonsapi.com/200/location/20.webp",


  // Página # 2

  "Shelbyville": "https://cdn.thesimpsonsapi.com/200/location/21.webp",
  "Springfield Union Station": "https://cdn.thesimpsonsapi.com/200/location/22.webp",
  "Springfield Subway System": "https://cdn.thesimpsonsapi.com/200/location/23.webp",
  "Springfield Opera House": "https://cdn.thesimpsonsapi.com/200/location/24.webp",
  "Bart's Treehouse": "https://cdn.thesimpsonsapi.com/200/location/25.webp",
  "Springfield Gorge": "https://cdn.thesimpsonsapi.com/200/location/26.webp",
  "744 Evergreen Terrace": "https://cdn.thesimpsonsapi.com/200/location/27.webp",
  "12th Avenue": "https://cdn.thesimpsonsapi.com/200/location/28.webp",
  "19 Fish Smell Drive": "https://cdn.thesimpsonsapi.com/200/location/29.webp",
  "27 Rural Route 9": "https://cdn.thesimpsonsapi.com/200/location/30.webp",
  "316 Pikeland Ave." :"https://cdn.thesimpsonsapi.com/200/location/31.webp",
  "3rd Street Station": "https://cdn.thesimpsonsapi.com/200/location/32.webp",
  "57 Walnut Street" : "https://cdn.thesimpsonsapi.com/200/location/33.webp",
  "725 Evergreen Terrace": "https://cdn.thesimpsonsapi.com/200/location/34.webp",
  "732 Evergreen Terrace" : "https://cdn.thesimpsonsapi.com/200/location/35.webp",
  "734 Evergreen Terrace" : "https://cdn.thesimpsonsapi.com/200/location/36.webp",
  "740 Evergreen Terrace (Brown House)": "https://cdn.thesimpsonsapi.com/200/location/37.webp",
  "743 Evergreen Terrace" : "https://cdn.thesimpsonsapi.com/200/location/38.webp",
  "754 Evergreen Terrace" : "https://cdn.thesimpsonsapi.com/200/location/39.webp",
  "82 Evergreen Terrace" : "https://cdn.thesimpsonsapi.com/200/location/40.webp",


  // Página  # 3

  "Abandoned Lighthouse": "https://cdn.thesimpsonsapi.com/200/location/41.webp",
  "Abercrombie and Rich": "https://cdn.thesimpsonsapi.com/200/location/42.webp",
  "Adult Education Annex": "https://cdn.thesimpsonsapi.com/200/location/43.webp",
  "Afghanistan": "https://cdn.thesimpsonsapi.com/200/location/44.webp",
  "Ah, Fudge! Factory": "https://cdn.thesimpsonsapi.com/200/location/45.webp",
  "Alaska": "https://cdn.thesimpsonsapi.com/200/location/46.webp",
  "Albania": "https://cdn.thesimpsonsapi.com/200/location/47.webp",
  "Algeria": "https://cdn.thesimpsonsapi.com/200/location/48.webp",
  "Alkali Flats": "https://cdn.thesimpsonsapi.com/200/location/49.webp",
  "All Creatures Great and Cheap": "https://cdn.thesimpsonsapi.com/200/location/50.webp",
  "Alley" :"https://cdn.thesimpsonsapi.com/200/location/51.webp",
  "Amazon Rainforest": "https://cdn.thesimpsonsapi.com/200/location/52.webp",
  "Amish Country" : "https://cdn.thesimpsonsapi.com/200/location/53.webp",
  "Another Government Highway Project That Will Never End": "https://cdn.thesimpsonsapi.com/200/location/54.webp",
  "Antarctica" : "https://cdn.thesimpsonsapi.com/200/location/55.webp",
  "Antiques" : "https://cdn.thesimpsonsapi.com/200/location/56.webp",
  "Aphrodite Inn": "https://cdn.thesimpsonsapi.com/200/location/57.webp",
  "Apu's apartment" : "https://cdn.thesimpsonsapi.com/200/location/58.webp",
  "Arby's" : "https://cdn.thesimpsonsapi.com/200/location/59.webp",
  "Argentina" : "https://cdn.thesimpsonsapi.com/200/location/60.webp",
  
};




// Función principal
async function cargarUbicaciones(pagina) { // Se declara una funcion asincrona llamando cargarUbicaciones que recibe un paramero de pagina

  try { // para capturar un error si algo sale mal dentro del try, se salta al catch
    const respuesta = await fetch(`${API_URL}?page=${pagina}`);  //para hacer peticiones con el fetch en el navegador  
    const data = await respuesta.json();  //  convierte la respuesta que viene en forma json  a objecto y espera la convecion que temine en data a  datos reales 
    console.log(` Página ${pagina}:`, data);   // Muestra en la consola del navegador los datos recibidps  
    
// await = pasusa la  ejecucion de la funcion hasta que la peticion responda 

    const ubicaciones = Array.isArray(data) // comprueba si data es array
      ? data   //si es array ubicacion es igual a data
      : data.results || [];   //y si no es Array usa data.results 

    contenedor.innerHTML = "";

    ubicaciones.forEach((ubi) => {  // inicia un bucle que recorre cada elementodel array ubicacionesy cada elemento se llama ubi
      const card = document.createElement("div");
      card.classList.add("card-ubicacion"); // agrega la clase de css al elemento card para aplicar los estilos 

      const img = document.createElement("img");
      img.src = imagenesPorUbicacion[ubi.name]  
      img.alt = ubi.name;

      const titulo = document.createElement("h3");
      titulo.textContent = ubi.name;

      card.appendChild(img); // inserta imagen del contenedor card 
      card.appendChild(titulo); //inserta titulo del contenedor card 
      card.addEventListener("click", () => mostrarDetalle(ubi));  // Cuando se hace clic en la tarjeta card, se muestra el detalle de (ubi)

      contenedor.appendChild(card); // Agrega la tarjeta card dentro del contenedor principal
    });

    paginaActual.textContent = `Página ${pagina}`;  //Actualiza el texto del elemento para mostrar el numero de la pagina actual 

    console.log(`Ubicaciones página ${pagina}:`, ubicaciones);
  } catch (error) {
    console.error("Error al cargar ubicaciones:", error);
  }
}

// Mostrar detalle
function mostrarDetalle(ubi) {
  const imgSrc = imagenesPorUbicacion[ubi.name] // Busca la imagen correspondiente a la informacion 

  detalle.innerHTML = `                   // para crear el contenidp de html que se va a mostrar en el contenedor 
    <div class="tarjeta-detalle">
      <h2>${ubi.name}</h2>                                        // Muestra el nombre del lugar 
      <img src="${imgSrc}" alt="${ubi.name}">                   //Muestra la imagen del lugar 
      <p><strong>ID:</strong> ${ubi.id}</p>
      <p><strong>Ciudad:</strong> ${ubi.town || "Desconocida"}</p>
      <p><strong>Uso:</strong> ${ubi.use || "Desconocido"}</p>
      <button class="boton-cerrar" onclick="cerrarDetalle()">Cerrar</button>
    </div>
  `;



  detalle.style.display = "flex";
}

// Cerrar detalle
function cerrarDetalle() {    
  detalle.style.display = "none";  // Para cerraer el modal 
}

// Botones de paginación
btnAnterior.addEventListener("click", () => { // Escucha el boton anteriro cuando el usuario le da clic
  const index = paginasPermitidas.indexOf(pagina);  // busca las paginas que estan permitidas [1,2,3]
  if (index > 0) { //revisa si hay una pagina anteropr 
    pagina = paginasPermitidas[index - 1]; // cambia la variable pagina anterior de la lista 
    cargarUbicaciones(pagina);  //llama la funcion que actualiza la pantanlla mostrando una nueva pagina 
  }
});

btnSiguiente.addEventListener("click", () => {  // Escucha el boton siguiente cuando el usuario le da clic
  const index = paginasPermitidas.indexOf(pagina); //Busca el valor dentro un array y devuelve el numero de la posicion donde lo encuentra 
  if (index < paginasPermitidas.length - 1) { 
    pagina = paginasPermitidas[index + 1]; //Si no esta en la ultima pagina pasa al siguiente valor de la lista 
    cargarUbicaciones(pagina);
  }
});

// Carga inicial
cargarUbicaciones(pagina);