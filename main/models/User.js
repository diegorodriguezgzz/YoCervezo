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
    celebBeer: String, //Cerveza que usas para celebrar
    beerStyle: String, //De que color prefieres tu cerveza? 
    beerHead: String, //Cuán espumosa te gusta tu cerveza? 
    beerGas: String, //La cerveza te gusta con mucho/medio/poco/nada de gas
    beerAlc: String, //Te gustan las cervezas con Mucho/algo/poco/nada de alcohol
    beerBitt: String, //Te gustan las cervezas muy amargas/ medio amargas / nada amargas /
    consumedBeer: [{type : Schema.Types.ObjectId, ref : "consumed-beers"}], //Rel. con el beer database Array con las cervezas que has probado
    beerLikeArray: [{type : Schema.Types.ObjectId, ref : "consumed-beers"}], //Rel. con el beer database Array con las 3 cervezas que más te han gustado
    beerDislikeArray: [{type : Schema.Types.ObjectId, ref : "consumed-beers"}], //Rel. con el beer database Array con las 3 cervezas que menos te gustan
    beerInterest: {type : String, enum : ["Bebedor de sofá", "Entusiasta", "Entrepreneur"]}, //Bebedor de sofá, Entusiasta, Entrepreneur 
    suggestedBeers: [{type : Schema.Types.ObjectId, ref : "consumed-beers"}],
    houseBeer: {type : Schema.Types.ObjectId, ref : "Beer"}
}, {
    timestamps : true
});

const User = mongoose.model('user', userSchema);

module.exports = User;