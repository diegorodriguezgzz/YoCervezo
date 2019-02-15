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

//IBU
exports.suggestBeerIBU = (userid) => {
  User.findById(userid)
    .populate('consumedBeer')
    .populate('beerLikeArray')
    .populate('beerDislikeArray')
    .then(user => {
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

      //Return IBU predicted to be his favorite

      //Is favIBU within 20% of max IBU tasted? //Caso A
      //Where percentage refers to range of IBUs tasted
      //Assume min IBU is 0 (bitterness irrelevant)
      const favDiff = favIBU / maxIBU;
      if ((1 - favDiff) < 0.20 && maxIBU <= 60) {
        return {
          suggestedIBU: maxIBU,
          meanIBU : avgIBU,
          rejectIBU: leastFavIBU
        }; //Then suggest something equally bitter to max.
      }
      else {
        return {
          suggestedIBU: favIBU,
          meanIBU : avgIBU,
          rejectIBU: leastFavIBU
        }; //Else, just suggest near mean bitterness
      }
    })
    .catch(err => {
      console.log(err);
    })
}

exports.suggestBeerABV = (userid) => {
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

      //Return ABV predicted to be his favorite

      const favDiff = favABV / maxABV;
      if ((1 - favDiff) < 0.20 && maxABV <= 0.065) {
        return {
          suggestedABV: maxABV,
          meanABV : avgABV,
          rejectABV: leastFavABV
        }; //Then suggest something equally charged to max.
      }
      else {
        return {
          suggestedABV: favABV,
          meanABV : avgABV,
          rejectABV: leastFavABV
        }; //Else, just suggest near mean alcohol conc.
      }
    })
    .catch(err => {
      console.log(err);
    })
}

const mean = (numArray) => {
  return ((numArray.length === 0) ?
    0 :
    numArray.reduce((ac, cv) => ac + cv, 0) / numArray.length)
}

//module.exports = suggestBeerIBU;
//ABV