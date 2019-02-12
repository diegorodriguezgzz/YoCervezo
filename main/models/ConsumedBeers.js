const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const consBeerSchema = new Schema({
  name : String,
  abv : Number,
  ibu : Number,
  style : String,
  brewery : String
});

const ConsumedBeers = mongoose.model('consumed-beers', consBeerSchema);

module.exports = ConsumedBeers;