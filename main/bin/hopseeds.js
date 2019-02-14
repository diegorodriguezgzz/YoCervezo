require('dotenv').config();

const Hop = require('../models/Hops');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB);

const hops = [
  {
    hopName: "Ahtanum",
    AAcids: "5.7",
  },
  {
    hopName: "Amarillo",
    AAcids: "8",
  },
  {
    hopName: "Cascade",
    AAcids: "5",
  },
]

Hop.create(hops, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${hops.length} hops`)
  mongoose.connection.close()
});

//Podemos webscrapear 