// const restBooksApi = axios.create({
//   baseUrl: "http://localhost:3000"
// });

// async function buscaLibro(strLibro) {
//   restBooksApi
//     .post("/buscar", strLibro)
//     .then(respuestaAPI => {
//       let htmlrespuesta = '<div class="grid-libros" id="tablalibros">';

//       respuestaAPI.data.forEach(libro => {
//         htmlrespuesta += `
//       <div><a href="/libros/${libro._id}">${libro.title}</a></div>
//       <div>${libro.author[0].name} ${libro.author[0].lastName}</div>
//       <div><a href="/libros/edit?book_id=${
//         libro._id
//       }" class="edit-button">Editar</a></div>`;
//       });

//       htmlrespuesta += "</div>";
//       //console.log(htmlrespuesta);
//       //document.getElementById("tablalibros").innerHTML = htmlrespuesta;
//       console.log("html respuesta", htmlrespuesta);
//       return htmlrespuesta;
//     })
//     .catch(err => {
//       console.log("Error es ", err);
//     });
// }
// const grilla = document.getElementById("titulo");
// grilla.addEventListener("keydown", evt => {
//   console.log(evt.keyCode);
//   const libro = document.getElementById("titulo").value;
//   const busqueda = { titulo: libro };
//   //document.getElementById("tablalibros").innerHTML = buscaLibro(busqueda);
//   restBooksApi
//     .post("/buscar", busqueda)
//     .then(respuestaAPI => {
//       let htmlrespuesta = '<div class="grid-libros" id="tablalibros">';

//       respuestaAPI.data.forEach(libro => {
//         htmlrespuesta += `
//       <div><a href="/libros/${libro._id}">${libro.title}</a></div>
//       <div>${libro.author[0].name} ${libro.author[0].lastName}</div>
//       <div><a href="/libros/edit?book_id=${
//         libro._id
//       }" class="edit-button">Editar</a></div>`;
//       });

//       htmlrespuesta += "</div>";
//       //console.log(htmlrespuesta);
//       //document.getElementById("tablalibros").innerHTML = htmlrespuesta;
//       console.log("html respuesta", htmlrespuesta);
//       document.getElementById("tablalibros").innerHTML = htmlrespuesta;
//     })
//     .catch(err => {
//       console.log("Error es ", err);
//     });
//   //console.log(buscaLibro(busqueda));
// });
