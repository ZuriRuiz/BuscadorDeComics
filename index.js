//Elementos del HTML

const tarjetasDePersonajes = document.querySelector("#tarjetas-De-Personajes");
const paginaAnterior = document.querySelector("#prev");
const paginaSiguiente = document.querySelector("#next");
const controlBotones = document.querySelector("#control-botones");
const formControl = document.querySelector("#form-control");
const formInput = document.querySelector("#form-input");
const seccionDetalle = document.querySelector("#detalle-tarjeta");
const tarjetaNueva = document.querySelector("#tarjeta-nueva");
const estiloTarjeta = document.querySelector(".estilo-tarjeta-nueva");

//Obtener informacion de los personajes de la api
fetch("https://rickandmortyapi.com/api/character/?page=1")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    crearTarjeta(data.results);
  });

//Creamos tarjetas
const crearTarjeta = (array) => {
  const html = array.reduce((acc, curr) => {
    return (
      acc +
      `
        <div class="contenedor-tarjetas">
          <article class = "personaje" data-id="${curr.id}"> 
              <h2>${curr.name}</h2>
              <img src="${curr.image}"</img>
          </article>
        </div>
      
      `
    );
  }, "");

  tarjetasDePersonajes.innerHTML = html;
  clickTarjetas();
};

/*Traer por id*/

const buscarPersonaje = (id) => {
  fetch(`https://rickandmortyapi.com/api/character/${id}`)
    .then((res) => res.json())
    .then((data) => {
      crearTarjetaDetalle(data);
    });
};

const crearTarjetaDetalle = (data) => {
  tarjetasDePersonajes.style.display = "none";
  seccionDetalle.style.display = "flex";
  controlBotones.style.display = "none";

  tarjetaNueva.innerHTML = `
    <article class="detalle-tarjeta estilo-tarjeta-nueva">
      <h2>${data.name}</h2>
      <img src="${data.image}"</img>
      <p>Status:${data.status}</p>
      <p>Species:${data.species}</p>
      <p>Origin:${data.origin.name}</p>
      <p>Gender:${data.gender}</p>
    </article>
  `;
};

const clickTarjetas = () => {
  const tarjetas = document.querySelectorAll(".personaje");

  for (let i = 0; i < tarjetas.length; i++) {
    tarjetas[i].onclick = () => {
      const id = tarjetas[i].dataset.id;
      buscarPersonaje(id);
    };
  }
};

// Paginado
let paginaActual = 1;
paginaAnterior.disabled = true;

const cambiarPagina = () => {
  fetch(`https://rickandmortyapi.com/api/character/?page=${paginaActual}`)
    .then((res) => res.json())
    .then((data) => {
      crearTarjeta(data.results);
    });
};

cambiarPagina();

/*Funcionalidad botones*/

paginaAnterior.onclick = () => {
  paginaActual = paginaActual - 1;
  if (paginaActual === 1) {
    paginaAnterior.disabled = true;
  }
  console.log(paginaActual);
  cambiarPagina();
};

paginaSiguiente.onclick = () => {
  paginaAnterior.disabled = false;
  paginaActual = paginaActual + 1;
  console.log(paginaActual);
  cambiarPagina();
};

// Busqueda Personaje
const buscarInfo = (busquedapersonaje) => {
  fetch(`https://rickandmortyapi.com/api/character/?name=${busquedapersonaje}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      crearTarjeta(data.results);
    });
};

formControl.onsubmit = (e) => {
  e.preventDefault();
  buscarInfo(formInput.value);
};
