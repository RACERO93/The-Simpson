const API_URL = "https://thesimpsonsapi.com/api/episodes";

const contenedor = document.getElementById("episodios");
const detalleContenedor = document.getElementById("detalle-episodio");
const volverBtn = document.getElementById("volver");

// Botones de paginación desde el HTML
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");
const paginaActualSpan = document.getElementById("paginaActual");

// Solo permitimos estas páginas
const paginasPermitidas = [1, 10, 25];  //este array solo permite el llamdo de estaas tres págias asignadas
let indicePagina = 0;  // Guarda la possicion actaul dentro del arreglo que corresponde a la página #1
let paginaActual = paginasPermitidas[indicePagina]; //se toma el valor que esta en la paginaActual oseaa pagina #1
const episodiosPorPagina = 20; //el llamado de cada episodio 

//  borra o comenta para dejoarlo normal 

// Para subir los videos 
const videoPerzonalizado = {
  "Simpsons Roasting on an Open Fire": "../Imagenes/videos/navidad.mp4",
  "Bart the Genius" : "../Imagenes/videos/Bart.mp4",
  "Homer's Odyssey": "../Imagenes/videos/Odyssey.mp4",
  "There's No Disgrace Like Home": "../Imagenes/videos/Disgrace.mp4",
  "Bart the General": "../Imagenes/videos/General.mp4",
  "Moaning Lisa": "../Imagenes/videos/Moaning.mp4",

}


// Imágenes de respaldo
const imagenesPorEpisodio = {

  //pagina 1
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
  "The Crepes of Wrath": "https://cdn.thesimpsonsapi.com/200/episode/11.webp",
  "Krusty Gets Busted": "https://cdn.thesimpsonsapi.com/200/episode/12.webp",
  "Some Enchanted Evening": "https://cdn.thesimpsonsapi.com/200/episode/13.webp",
  "Bart Gets an \"F\"": "https://cdn.thesimpsonsapi.com/200/episode/14.webp",
  "Simpson and Delilah": "https://cdn.thesimpsonsapi.com/200/episode/15.webp",
  "Treehouse of Horror": "https://cdn.thesimpsonsapi.com/200/episode/16.webp",
  "Two Cars in Every Garage and Three Eyes on Every Fish": "https://cdn.thesimpsonsapi.com/200/episode/17.webp",
  "Dancin' Homer": "https://cdn.thesimpsonsapi.com/200/episode/18.webp",
  "Dead Putting Society": "https://cdn.thesimpsonsapi.com/200/episode/19.webp",
  "Bart vs. Thanksgiving": "https://cdn.thesimpsonsapi.com/200/episode/20.webp",

  //  Página 10

  "Lisa's Sax": "https://cdn.thesimpsonsapi.com/200/episode/181.webp",
  "Treehouse of Horror VIII": "https://cdn.thesimpsonsapi.com/200/episode/182.webp",
  "The Cartridge Family": "https://cdn.thesimpsonsapi.com/200/episode/183.webp",
  "Bart Star": "https://cdn.thesimpsonsapi.com/200/episode/184.webp",
  "The Two Mrs. Nahasapeemapetilons": "https://cdn.thesimpsonsapi.com/200/episode/185.webp",
  "Lisa the Skeptic": "https://cdn.thesimpsonsapi.com/200/episode/186.webp",
  "Realty Bites": "https://cdn.thesimpsonsapi.com/200/episode/187.webp",
  "Miracle on Evergreen Terrace": "https://cdn.thesimpsonsapi.com/200/episode/188.webp",
  "All Singing, All Dancing": "https://cdn.thesimpsonsapi.com/200/episode/189.webp",
  "Bart Carny": "https://cdn.thesimpsonsapi.com/200/episode/190.webp",
  "The Joy of Sect": "https://cdn.thesimpsonsapi.com/200/episode/191.webp",
  "Das Bus": "https://cdn.thesimpsonsapi.com/200/episode/192.webp",
  "The Last Temptation of Krust": "https://cdn.thesimpsonsapi.com/200/episode/193.webp",
  "Dumbbell Indemnity": "https://cdn.thesimpsonsapi.com/200/episode/194.webp",
  "Lisa the Simpson": "https://cdn.thesimpsonsapi.com/200/episode/195.webp",
  "This Little Wiggy": "https://cdn.thesimpsonsapi.com/200/episode/196.webp",
  "Simpson Tide": "https://cdn.thesimpsonsapi.com/200/episode/197.webp",
  "The Trouble with Trillions": "https://cdn.thesimpsonsapi.com/200/episode/198.webp",
  "Girly Edition": "https://cdn.thesimpsonsapi.com/200/episode/199.webp",
  "Trash of the Titans": "https://cdn.thesimpsonsapi.com/200/episode/200.webp",

  //   Pagina 25

  "Love is a Many Strangled Thing": "https://cdn.thesimpsonsapi.com/200/episode/481.webp",
  "The Great Simpsina": "https://cdn.thesimpsonsapi.com/200/episode/482.webp",
  "The Real Housewives of Fat Tony": "https://cdn.thesimpsonsapi.com/200/episode/483.webp",
  "Homer Scissorhands": "https://cdn.thesimpsonsapi.com/200/episode/484.webp",
  "500 Keys": "https://cdn.thesimpsonsapi.com/200/episode/485.webp",
  "The Ned-liest Catch": "https://cdn.thesimpsonsapi.com/200/episode/486.webp",
  "The Falcon and the D'ohman": "https://cdn.thesimpsonsapi.com/200/episode/487.webp",
  "Bart Stops to Smell the Roosevelts": "https://cdn.thesimpsonsapi.com/200/episode/488.webp",
  "Treehouse of Horror XXII": "https://cdn.thesimpsonsapi.com/200/episode/489.webp",
  "Replaceable You": "https://cdn.thesimpsonsapi.com/200/episode/490.webp",
  "The Food Wife": "https://cdn.thesimpsonsapi.com/200/episode/491.webp",
  "The Book Job": "https://cdn.thesimpsonsapi.com/200/episode/492.webp",
  "The Man in the Blue Flannel Pants": "https://cdn.thesimpsonsapi.com/200/episode/493.webp",
  "The Ten-Per-Cent Solution": "https://cdn.thesimpsonsapi.com/200/episode/494.webp",
  "Holidays of Future Passed": "https://cdn.thesimpsonsapi.com/200/episode/495.webp",
  "Politically Inept, with Homer Simpson": "https://cdn.thesimpsonsapi.com/200/episode/496.webp",
  "The D'oh-cial Network": "https://cdn.thesimpsonsapi.com/200/episode/497.webp",
  "Moe Goes from Rags to Riches": "https://cdn.thesimpsonsapi.com/200/episode/498.webp",
  "The Daughter Also Rises": "https://cdn.thesimpsonsapi.com/200/episode/499.webp",
  "At Long Last Leave": "https://cdn.thesimpsonsapi.com/200/episode/500.webp",
};

// Cargar episodios
async function cargarEpisodios(pagina = 1) {
  try {
    const respuesta = await fetch(`${API_URL}?page=${pagina}`);
    const data = await respuesta.json();
    console.log(` Página ${pagina}:`, data);

    const episodios = Array.isArray(data) //si data es un arreglo, guarda data en en la variable de episodios. si no, guarda un array vacio., 
      ? data.slice(0, episodiosPorPagina)// toma los primros episodios que estan definifo en la variable y muetras la cantidad de episodio por pagina 
      : data.results.slice(0, episodiosPorPagina); //toma los primeroe elementos del array data.results y lo pone en un nuevo arreglo ( slice= inicio,fin)



    contenedor.innerHTML = "";

    episodios.forEach((ep) => {
      const card = document.createElement("div");
      card.classList.add("card-episodio");  //elemento card agrega una clase de CSS par que tome los estilos definido  


      const img = document.createElement("img");
      img.src =
        imagenesPorEpisodio[ep.name] ||
        ep.imagePath ||
        "https://cdn.thesimpsonsapi.com/200/episode/default.webp";
      img.alt = ep.name;





      //para cargar el video 
      if (videoPerzonalizado[ep.name]) {
        img.addEventListener("click", () => {
          const video = document.createElement("video")
          video.src = videoPerzonalizado[ep.name];
          img.style.cursor = "pointer";
          video.controls = true;
          video.autoplay = true;
          video.style.width = "100%";
          video.style.borderRadius = "10px";

          card.innerHTML = "";
          card.appendChild(video);


          // Cuando el video termine vuelve a poner la imagen y el titulo 
          video.addEventListener("ended", () => {
            card.innerHTML = ""; // Limpia el contenido del video
            card.appendChild(img); //vuelve a poner la imagen original
            card.appendChild(titulo); // Vuelve a ponel el titulo 

          })

        
          card.appendChild(video);
          card.appendChild(titulo);

        });

      }

      const titulo = document.createElement("h3");
      titulo.textContent = ep.name;

      card.appendChild(img);
      card.appendChild(titulo);
      contenedor.appendChild(card);



      // Solo abrimos el modal si NO hay video  por si quiero quitar el video 
      if (!videoPerzonalizado[ep.name]) {
        card.addEventListener("click", () => mostrarDetalle(ep)); // Cuando se hace clic en la tarjeta card, se muestra el detalle de (ep)
      }

      contenedor.appendChild(card);  // Agrega la tarjeta card dentro del contenedor principal
    });


    // Mostrar número de página actual
    paginaActualSpan.textContent = `Página ${pagina}`;

  } catch (error) {
    console.error(" Error al cargar episodios:", error);
  }
}

// Mostrar detalle del episodio (modal)
function mostrarDetalle(ep) {
  detalleContenedor.innerHTML = `
    <div class="tarjeta-detalle">
      <h2>${ep.name}</h2>
        <img src="${imagenesPorEpisodio[ep.name] || ep.imagePath}" alt="${ep.name}">
        <p><strong>ID:</strong> ${ep.id || "No disponible"}</p>
        <p><strong>Fecha:</strong> ${ep.airdate || "No disponible"}</p>
        <p><strong>Episodio #:</strong> ${ep.episode_number || "?"}</p>
        <p><strong>Temporada:</strong> ${ep.season || "?"}</p>
        <p><strong>Sinopsis:</strong> ${ep.synopsis || "Sin descripción disponible."}</p>
        <button id="cerrarDetalle" class="btn-volver">Cerrar</button>
    </div>
    `;

  detalleContenedor.style.display = "flex";
  document.getElementById("cerrarDetalle").addEventListener("click", () => {
    detalleContenedor.style.display = "none";
  });
}

// Paginación
btnAnterior.addEventListener("click", () => {
  if (indicePagina > 0) {
    indicePagina--;
    paginaActual = paginasPermitidas[indicePagina];
    cargarEpisodios(paginaActual);
  }
});

//Función para activar/desactivar botones
function actualizarBotones() {
  const index = paginasPermitidas.indexOf(pagina);

  // Si esta en la primera página desactiva que no salgfa nada atras 
  btnAnterior.disabled = index === 0;
  // Si esta en la última página  desactiva para que no salga nada ”
  btnSiguiente.disabled = index === paginasPermitidas.length - 1;
}

btnSiguiente.addEventListener("click", () => {
  if (indicePagina < paginasPermitidas.length - 1) {
    indicePagina++;
    paginaActual = paginasPermitidas[indicePagina];
    cargarEpisodios(paginaActual);
  }
});

// Botón volver del modal
volverBtn.addEventListener("click", () => {
  detalleContenedor.style.display = "none";
});

// Cargar la primera página
cargarEpisodios(paginaActual);



