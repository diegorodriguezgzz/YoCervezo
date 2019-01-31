const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({

});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;