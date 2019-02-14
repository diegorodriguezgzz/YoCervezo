const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hopSchema = new Schema ({
hopName: String,
AAcids: Number,
})

const Hop = mongoose.model('hop',hopSchema)

module.exports = Hop;