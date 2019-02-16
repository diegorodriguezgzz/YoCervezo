const express = require('express');
const router = express.Router();
const Beer = require('../models/Beer');
const ConsumedBeers = require('../models/ConsumedBeers');
const User = require('../models/User');
const Hops = require('../models/Hops');
const intel = require('../inteligencia/seleccion')

/* GET home page */
router.get('/', (req, res, next) => {
  return res.render('index');
});


router.get('/showrecipe', (req, res, next) => {
  return res.render('showrecipe');
});

router.get('/addrecipe/:userid', (req, res) => {
  const userid = req.params.userid;
  Hops.find()
    .then(hops => {
      Malt.find()
        .then(malts => {
          return res.render('addrecipe', { malts, hops, userid: userid });
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
});

router.post('/addrecipe/:userid', (req, res) => {
  const {
    maltb,
    maltsE,
    hops
  } = req.body
  const userid = req.params.userid;
  User.findById(userid)
    .then(user => {
      //Get list of recipes
      //List of beers is an array
      //Append new recipe to end of array
      //Set list of recipes to be appended list
    })
    .catch(err => {
      console.log(err);
    })
})

router.get('/beers', (req, res, next) => {
  Beer.find()
    .then(beers => {
      return res.render('beers', { beers });
    })
    .catch(err => {
      console.log(err);
      next();
    });
});

router.get('/seleccion/:userid', (req, res, next) => {
  ConsumedBeers.find()
    .then(consumedBeers => {
      return res.render('seleccion', {
        consumedBeers,
        userid: req.params.userid
      });
    })
    .catch(err => {
      console.log(err);
      next();
    });
});

router.post('/seleccion/:userid', (req, res, next) => {
  const { beers } = req.body;
  User.findOneAndUpdate({ _id: req.params.userid },
    {
      $set: { consumedBeer: beers }
    })
    .then(user => {
      console.log('Confirmed consumed beers for ', user.username);
      return res.redirect(`/onboarding/${req.params.userid}`);
    })
    .catch(err => {
      console.log(err);
      next();
    });
});

router.get('/onboarding/:userid', (req, res, next) => {
  User.findById(req.params.userid)
    .populate('consumedBeer')
    .then(user => {
      const consumedBeers = user.consumedBeer;
      return res.render('onboarding', { userid: user._id, consumedBeers, user: user });
    })
    .catch(err => {
      console.log(err);
      next();
    });
});



router.post('/onboarding/:userid', (req, res, next) => {
  const {
    celebBeer,
    beerStyle,
    beerHead,
    beerGas,
    beerAlc,
    beerBitt,
    beerLikeArray,
    beerDislikeArray
  } = req.body

  intel.suggestBeerParams(req.params.userid)
    .then(suggestion => {
      const { suggestedIBU, suggestedABV } = suggestion;

      Beer.find()
        .then(housebeers => {
          lossHouse = housebeers.map(el => {
            return({
              id: el._id,
              loss: (Math.abs(suggestedIBU - el.ibu) / 120) * 2 + (Math.abs(suggestedABV - el.abv) / 0.1),
              name: el.name
            })
          });
          lossHouse.sort((a, b) => a.loss - b.loss);
          houseBeer = lossHouse[0].id;

          //Function to suggest beers
          ConsumedBeers.find()
            .then(beers => {
              lossPairs = beers.map(el => {
                return ({
                  id: el._id,
                  //IBU is easier to taste, so it is counted double, within scale
                  loss: (Math.abs(suggestedIBU - el.ibu) / 120) * 2 + (Math.abs(suggestedABV - el.abv) / 0.1),
                  name: el.name
                });
              });
              lossPairs.sort((a, b) => a.loss - b.loss);
              let suggestedBeers = lossPairs.slice(0, 3).map(el => el.id);

              User.findOneAndUpdate({ _id: req.params.userid },
                {
                  $set: {
                    celebBeer,
                    beerStyle,
                    beerHead,
                    beerGas,
                    beerAlc,
                    beerBitt,
                    beerLikeArray,
                    beerDislikeArray,
                    suggestedBeers,
                    houseBeer
                  }
                })
                .then(user => {
                  console.log(`Onboarding complete for ${user.username}!`);
                  return res.redirect(`/your-beers/${req.params.userid}`);
                })
                .catch(err => {
                  console.log(err);
                  next();
                });
            })
            .catch(err => {
              console.log(err);
              next();
            });
        })
        .catch(err => {
          console.log(err);
          next();
        })
    })
    .catch(err => {
      console.log(err);
      next();
    });
});


router.get('/beers/:id', (req, res, next) => {
  Beer.findById(req.params.id)
    .then(beer => {
      return res.render('beer-detail', beer);
    })
    .catch(err => {
      console.log(err);
      next();
    });
});

router.get('/your-beers/:userid', (req, res, next) => {
  User.findById(req.params.userid)
    .populate('suggestedBeers')
    .populate('houseBeer')
    .then(user => {
      res.render('your-beers', user);
    })
    .catch(err => {
      console.log(err)
      next();
    });

});

module.exports = router;
