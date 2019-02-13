const Beer = require('../models/Beer');
const mongoose = require('mongoose');

// const beerSchema = new Schema({
  // sku: String, //dejo los sku's para futura evaluación. 
  // stock: Number,
  // price: Number,
  // style: String,
  // brand: String,
  // image_src: String,
  // country: String, //Nacionalidad
  // description : String,
  // ibu: Number,
  // abv: Number,
  // color: String, //Hay que ver si se representa src como número o solo como string "claro, oscuro, blonde"
  // tags : [String] //Es un array de strings: Citrusy, Malty, Chocolate, Bitter, etc. 
// });

mongoose
  .connect('mongodb://localhost/yocervezo', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });
 
const seedBeers = [{
  sku : "YC-001",
  stock : 250,
  price : 79,
  style : "Chocolate Stout",
  name: "La rebelde",
  brand : "YoCervezo",
  image_src : "images/default.png",
  country : "México",
  description : `Esta cerveza intentó una y otra vez
  arruinar la vida del cervecero, pero finalmente
  pactó con él para dar gusto a los clientes. Sus
  sabores son, francamente, irrepetibles.`,
  ibu : 40,
  abv : 4.7,
  color : "#8b4513",
  tags : ["House beer", "Mexican beer"]
},{
  sku : "YC-002",
  stock : 250,
  price : 79,
  style : "Rocky Pilsner",
  name : "La arruinada",
  brand : "YoCervezo",
  image_src : "images/default.png",
  country : "México",
  description : `Además de con mucho amor,
  en esta cerveza se aventó un celular inutil.
  ¡Pensábamos que la iba a arruinar, pero no la
  podemos dejar de tomar!`,
  ibu : 25,
  abv : 4.2,
  color : "#ffa54f",
  tags : ["House beer", "Challenging", "Mexican beer"]
},{
  sku : "YC-003",
  stock : 250,
  price : 79,
  style : "Cream Ale",
  name : "La educada",
  brand : "YoCervezo",
  image_src : "images/default.png",
  country : "México",
  description : `Una cerveza muy noble que dará
  un buen tour por los encantos de las artesanales
  hasta al más novato de los paladares... Eso sí,
  no tomes si no has cumplido 18 años, ya tendrás
  edad para tomar después ;-)`,
  ibu : 14,
  abv : 5.5,
  color : "#cd8500",
  tags : ["House beer", "Mexican beer"]   
},{
  sku : "YC-004",
  stock : 250,
  price : 79,
  style : "Imperial Stout",
  name : "La negra",
  brand : "YoCervezo",
  image_src : "images/default.png",
  country : "México",
  description : `Una de nuestras creaciones más 
  apreciadas por nuestros cerveceros. Parece hecha
  de petróleo, pero para paladares refinados es de
  lo mejorcito en el mercado. Recomendada para 
  catadores de cerveza con experiencia.`,
  ibu : 68,
  abv : 8.9,
  color : "#0d0808",
  tags : ["House beer", "Mexican beer"]
},{
  sku : "YC-005",
  stock : 250,
  price : 79,
  style : "Chocolate stout",
  brand : "YoCervezo",
  name : "La chocolata",
  image_src : "images/default.png",
  country : "México",
  description : `No sabe a chocolate, aunque tiene
  un color tostadito que se le parece montón. Buena
  para acompañar música clásica y quesos medianos.`,
  ibu : 35,
  abv : 5.5,
  color : "#250703",
  tags : ["House beer", "Mexican beer"]
},{
  sku : "YC-006",
  stock : 250,
  price : 79,
  style : "India Pale Ale",
  name : "La amarga",
  brand : "YoCervezo",
  image_src : "images/default.png",
  country : "México",
  description : `La primera vez que nuestro maestro
  cervecero probó esta creación, pensó que se había
  tomado una taza de jabón líquido y llamó a una
  ambulancia. Si vives por los sabores amargos, ésta es tu
  cerveza.`,
  ibu : 115,
  abv : 6.8,
  color : "#f2ae3a",
  tags : ["House beer", "Mexican beer"]
},{
  sku : "YC-007",
  stock : 250,
  price : 79,
  style : "Flanders Red",
  name : "La agria",
  brand : "YoCervezo",
  image_src : "images/default.png",
  country : "México",
  description : `Esta bella cerveza oculta un arma
  secreta: su carácter agrio. La recomendamos en 
  maridaje con aves a las hierbas.`,
  ibu : 10,
  abv : 4.7,
  color : "#9d2e1e",
  tags : ["House beer", "Mexican beer"]
},{ 
  sku : "YC-008",
  stock : 250,
  price : 79,
  style : "Raspberry Pilsner",
  name : "La emperadora",
  brand : "YoCervezo",
  image_src : "images/default.png",
  country : "México",
  description : `Cuando Luis X de Baviera proclamó
  el Reinheitsgebot en el Sacro Imperio Romano en 1516,
  nunca imaginó que romper su norma con la adición de 
  nuestro toque especial - frambuesas - haría una cerveza
  con el morado y sabor dignos de un verdadero Emperador.
  O quizá sí lo sabía y por eso prohibió que se agregaran
  ingredientes adicionales al agua, lúpulo, malta y levadura
  a las cervezas en Baviera. De todos modos, prost!`,
  ibu : 13,
  abv : 4.6,
  color : "#1b153e",
  tags : ["House beer", "Mexican beer"]
},{
  sku : "YC-009",
  stock : 250,
  price : 79,
  style : "Lager",
  name : "La triste",
  brand : "YoCervezo",
  image_src : "images/default.png",
  country : "México",
  description : `La triste floreció una noche de un
  sueño de José José. O tal vez de una noche de 
  frustración de nuestro maestro cervecero.
  Es una de las dos.`,
  ibu : 14,
  abv : 4.3,
  color : "#e97234",
  tags : ["House beer", "Mexican beer"]
}
];
Beer.create(seedBeers)
  .then(beers => console.log(beers.map(beer => beer.brand)))
  .catch(err => console.log("An error occurred: ", err));






// La ruda 
// La ojete 
// La mejor
// La agresiva
// La académica
// La ironhacker
// La criminal
// La sinvergüenza
// La matona 
// La presidenta
// La alegre