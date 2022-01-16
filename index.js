//Elementos del HTML 

const tarjetasDePersonajes = document.querySelector("#tarjetas-De-Personajes") 


//Obtener informacion de los personajes de la api
fetch("https://rickandmortyapi.com/api/character/?page=2")
.then(res => res.json())
.then((data) => {
    console.log(data)
    crearTarjeta(data.results)
   
})

const crearTarjeta = (array) => {
  const html = array.reduce ((acc, curr) => {
      return acc + `
      
        <div class="contenedor-tarjetas">
          <article class = "personaje"> 
              <h2>${curr.name}</h2>
              <p>${curr.status}</p>
              <p>${curr.species}</p>
              <img src="${curr.image}"</img>
          </article>
        </div>
      
      `
  },"")

  tarjetasDePersonajes.innerHTML= html
  
}