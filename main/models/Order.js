const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({

    malt2: String,
    malt1: String,
    malt3: String,
    malt4: String, //rara vez hay cervezas de + de 4
    malt5: String,
    qtyMalt1: Number,
    qtyMalt2: Number,
    qtyMalt3: Number,
    qtyMalt4: Number,
    qtyMalt5: Number,
    hop1: String,
    hop2: String,
    hop3: String,
    hop4: String,
    hop5: String,
    hop6: String,
    qtyHop1: String,
    qtyHop2: String,
    qtyHop3: String,
    qtyHop4: String,
    qtyHop5: String,
    qtyHop6: String,
    dryHopped: Boolean,
    dhHop1: String,
    dhHop2: String,
    qtyDHop1: Number,
    qtyDHop2: Number,

});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;