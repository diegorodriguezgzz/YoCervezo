const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const beerSchema = new Schema({
  sku: String, //dejo los sku's para futura evaluación. 
  stock: Number,
  price: Number,
  style: String,
  brand: String,
  image_src: String,
  country: String, //Nacionalidad
  description : String,
  ibu: Number,
  alc: Number,
  color: Number, //Hay que ver si se representa src como número o solo como string "claro, oscuro, blonde"
  tags : [String] //Es un array de strings: Citrusy, Malty, Chocolate, Bitter, etc. 
});

const Beer = mongoose.model('Beer', beerSchema);

module.exports = Beer;