const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({

    beerName:String,
    beerDesc:String, 
    beerWish:String,
    maltb: String,
    maltsE : [{type: Schema.Types.ObjectId, ref : "malt"}],
    qtyMaltb : Number,
    qtyMalts: [Number],
    hops : [{type: Schema.Types.ObjectId, ref : "hop"}],
    qtyHops: [Number],
    dryHopped: Boolean,
    dhHops: [{type: Schema.Types.ObjectId, ref : "hop"}],
    qtyDHops: [Number]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;