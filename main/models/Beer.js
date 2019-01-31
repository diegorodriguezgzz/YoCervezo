const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const beerSchema = new Schema({
  sku : String,
  stock : Number,
  price : Number,
  //currency : String,
  // recipe : {
  //   /* 
  //   Llenar con Santiago
  //   */
  // },
  style : String,
  brand : String,
  image_src : String,
  //origin : String, //Nacionalidad
  //description : String,
  //tags : [String] //Incluir el lote después y pensar en caducidades
});

const Beer = mongoose.model('Beer', beerSchema);

module.exports = Beer;