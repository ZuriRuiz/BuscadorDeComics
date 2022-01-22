//Elementos del HTML

const tarjetasDePersonajes = document.querySelector("#tarjetas-De-Personajes");
const paginaAnterior = document.querySelector("#prev");
const paginaSiguiente = document.querySelector("#next");

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
          <article class = "personaje"> 
              <h2>${curr.name}</h2>
              <img src="${curr.image}"</img>
          </article>
        </div>
      
      `
    );
  }, "");

  tarjetasDePersonajes.innerHTML = html;
};

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
