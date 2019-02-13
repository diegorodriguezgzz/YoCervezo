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
//TODO: Ver qué hacemos con los que no tienen IBU registrado
// ¿quizás imputar con base en el estilo desde R?
const suggestBeerIBU = (userid) => {
  User.findById(userid)
    .populate('consumedBeer')
    .populate('beerLikeArray')
    .populate('beerDislikeArray')
    .then(user => {
      console.log("CB ", user.consumedBeer);
      let tastedIBU = user.consumedBeer.map(el => el.ibu);
      console.log(tastedIBU);
      let likedIBU = user.beerLikeArray.map(el => el.ibu);
      console.log("l", likedIBU)
      let dislikedIBU = user.beerDislikeArray.map(el => el.ibu);
      console.log('d', dislikedIBU)
      //Find max IBU
      const maxIBU = Math.max(tastedIBU);
      console.log('m', maxIBU)

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
      console.log('favDiff', favDiff, (1-favDiff))
      if ((1 - favDiff) < 0.20 && maxIBU <= 60) {
        return ({
          suggestedIBU: maxIBU,
          meanIBU : avgIBU,
          rejectIBU: leastFavIBU
        }); //Then suggest something equally bitter to max.
      }
      else {
        return ({
          suggestedIBU: favIBU,
          meanIBU : avgIBU,
          rejectIBU: leastFavIBU
        }); //Else, just suggest near mean bitterness
      }
      // else if ((1 - favDiff) > 0.20 && maxIBU <= 60) { //If range is narrow and low bitterness is preferred
      //   return favIBU; //Then suggest something similar to favorite bitterness
      // }
      //TODO: Maybe change to a function
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

module.exports = suggestBeerIBU;
//ABV