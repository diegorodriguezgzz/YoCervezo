const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    country: String,
    province: String,
    street: String,
    number: Number,
    email: String,
    zipCode: Number,
    bestBeer: String, //Rel. a Beer Model? 
    worstBeer: String,  //Rel. a Beer Model? 
    celebBeer: String, //Cerveza que usas para celebrar
    beerStyle: String, //De que color prefieres tu cerveza? 
    beerHead: String, //Cuán espumosa te gusta tu cerveza? 
    beerGas: String, //La cerveza te gusta con mucho/medio/poco/nada de gas
    beerAlc: String, //Te gustan las cervezas con Mucho/algo/poco/nada de alcohol
    beerBitt: String, //Te gustan las cervezas muy amargas/ medio amargas / nada amargas /
    consumedBeer: [String], //Rel. con el beer database Array con las cervezas que has probado
    beerLikeArray: [String], //Rel. con el beer database Array con las 3 cervezas que más te han gustado
    beerDislikeArray: [String], //Rel. con el beer database Array con las 3 cervezas que menos te gustan
    beerInterest: [String], //Bebedor de sofá, Entusiasta, Entrepreneur 
    belt: Number //Nivel del cervezador dentro del 
});

const User = mongoose.model('User', userSchema);

module.exports = User;