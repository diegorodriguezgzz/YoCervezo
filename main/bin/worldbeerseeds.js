require('dotenv').config();

const ConsumedBeers = require('../models/ConsumedBeers');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB);

let seedsArr = [];
csv.fromPath("./bin/primerasCervezas.csv", {headers: true})
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

  // seedsArr = seedsArr.filter(el => {
  //   return el.brewery_id !== 0;
  // });
//  seedsArr = seedsArr.filter(el => {
//    return (!isNaN(el.brewery_id) &&
//            !isNaN(el.ibu) &&
//            !isNaN(el.cat_id) &&
//            el.style_id !== 'NaN' &&
//            el.srm !== 'NaN');
//  })
  //Se generan los registros en la BD
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