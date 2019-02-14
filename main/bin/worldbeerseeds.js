require('dotenv').config();
const csv = require('fast-csv')

const ConsumedBeers = require('../models/ConsumedBeers');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB);

let seedsArr = [];
csv.fromPath("./bin/tercerasCervezas.csv", {headers: true})
.on("data", data => {
  seedsArr.push(data);
})
.on("end", () => {
  //Convierte strings en floats
  seedsArr = seedsArr.map(el => {
    el.ibu = forceFloat(el.ibu);
    el.abv = forceFloat(el.abv);
    return el;
  });

  ConsumedBeers.create(seedsArr, (err) => {
    if (err) {throw(err)}
    console.log(`Generó ${seedsArr.length} cervezas`);
    mongoose.connection.close();
  })  
});

//Obliga a números a ser floating point
let forceFloat = (x) => {
  return (isNaN(parseFloat(x))) ? null : parseFloat(x);
}