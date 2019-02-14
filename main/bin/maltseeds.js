require('dotenv').config();

const Malt = require('../models/Malt');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB);

const malts = [
  {
    name: "Bohemian Pilsen",
    country: "Germany",
    price: "20",
    type:"Base",
    brand:"Weyermann"
  },
  {
    name: "Pilsen",
    country: "Germany",
    price: "20",
    type:"Base",
    brand:"Weyermann"
  },
  {
    name: "Pale Ale",
    country: "Germany",
    price: "20",
    type:"Base",
    brand:"Weyermann"
  },
  {
    name: "Viena",
    country: "Germany",
    price: "20",
    type:"Base",
    brand:"Weyermann"
  },
  {
    name: "Munich I",
    country: "Germany",
    price: "20",
    type:"Base",
    brand:"Weyermann"
  },
  {
    name: "Trigo - Dark",
    country: "Germany",
    price: "20",
    type:"Base",
    brand:"Weyermann"
  },
]

Malt.create(malts, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${malts.length} malts`)
  mongoose.connection.close()
});
