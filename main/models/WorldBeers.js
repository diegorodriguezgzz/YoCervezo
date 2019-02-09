const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const worldBeerSchema = new Schema({
  brewery_id : Number,
  name : String,
  cat_id : Number,
  style_id : Number,
  abv: Number,
  ibu : Number,
  srm : Number,
  upc : String,
  filepath : String,
  descript : String,
  last_mod : String
});

const WorldBeers = mongoose.model('world-beers', worldBeerSchema);

module.exports = WorldBeers;