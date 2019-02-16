/* 
4 casos:
A) Rango angosto de cervezas probadas, amargor alto preferido
=> Sugerir algo ligeramente más amargo, no demasiado
B) Rango angosto de cervezas probadas, amargor bajo preferido
C) Rango amplio de cervezas probadas, amargor ideal identificado

Lo mismo aplica para ABV

Tratar de variar los estilos
*/
//const mongoose = require('mongoose');
const User = require('../models/User');

exports.suggestBeerParams = (userid) => {
  const Sug = new Promise((resolve, reject) => {
    User.findById(userid)
    .populate('consumedBeer')
    .populate('beerLikeArray')
    .populate('beerDislikeArray')
    .then(user => {
      let tastedABV = user.consumedBeer.map(el => el.abv);
      let likedABV = user.beerLikeArray.map(el => el.abv);
      let dislikedABV = user.beerDislikeArray.map(el => el.abv);
      //Find max ABV
      const maxABV = Math.max.apply(null, tastedABV);

      //Find mean ABV of own beers
      const avgABV = mean(tastedABV);
      //Find mean ABV of favorite beers
      const favABV = mean(likedABV);
      //Find mean ABV of disliked beers
      const leastFavABV = mean(dislikedABV);

      let tastedIBU = user.consumedBeer.map(el => el.ibu);
      let likedIBU = user.beerLikeArray.map(el => el.ibu);
      let dislikedIBU = user.beerDislikeArray.map(el => el.ibu);
      //Find max IBU
      const maxIBU = Math.max.apply(null, tastedIBU);

      //Find mean IBU of own beers
      const avgIBU = mean(tastedIBU);
      //Find mean IBU of favorite beers
      const favIBU = mean(likedIBU);
      //Find mean IBU of disliked beers
      const leastFavIBU = mean(dislikedIBU);


      let suggestions = {
        suggestedABV: favABV,//suggest near mean alcohol conc.
        meanABV : avgABV,
        rejectABV: leastFavABV,
        suggestedIBU: favIBU,
        meanIBU : avgIBU,
        rejectIBU: leastFavIBU
      }
      //Return ABV predicted to be his favorite
      //Unless this is near top of range
      const favDiffABV = favABV / maxABV;
      const favDiffIBU = favIBU / maxIBU;
      if ((1 - favDiffABV) < 0.20 && maxABV <= 0.065) {
        suggestions.suggestedABV = maxABV; //in which case suggest something equally charged to max.
      }
      //Is favIBU within 20% of max IBU tasted? //Caso A
      //Where percentage refers to range of IBUs tasted
      //Assume min IBU is 0 (bitterness irrelevant)
      if ((1 - favDiffIBU) < 0.20 && maxIBU <= 60) {
        suggestions.suggestedIBU = maxIBU;
      }
      if(user){
        resolve(suggestions)
      }
    })
    .catch(err => {
      reject(err)
    })
  })
  return Sug
}

const mean = (numArray) => {
  return ((numArray.length === 0) ?
    0 :
    numArray.reduce((ac, cv) => ac + cv, 0) / numArray.length)
}