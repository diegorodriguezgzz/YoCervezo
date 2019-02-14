const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const maltSchema = new Schema({
 name: String,
 country: String,
 price: Number,
 type:String,
 brand: String
})

const Malt = mongoose.model('malt',maltSchema);

module.exports = Malt; 