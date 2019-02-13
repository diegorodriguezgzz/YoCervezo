const express = require('express');
const router = express.Router();
const Beer = require('../models/Beer');
const ConsumedBeers = require('../models/ConsumedBeers');
const User = require('../models/User');
const suggestBeerIBU = require('../inteligencia/seleccion')//TODO: Test, remove

/* GET home page */
router.get('/', (req, res, next) => {
  return res.render('index');
});

router.get('/onboarding', (req, res, next) => {
  return res.render('onboarding')
});

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
      return res.render('onboarding', { userid: user._id, consumedBeers });
    })
    .catch(err => {
      console.log(err);
      next();
    })
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
        beerDislikeArray
      }
    })
    .then(user => {
      console.log(`Onboarding complete for ${user.username}!`);
      return res.redirect('/');
    })
    .catch(err => {
      console.log(err);
      next();
    })
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

//Test TODO: Remove
router.get('/testSuggest', (req, res, next) => {
  let user = User.findById('5c6257c7e817c12426eb66dc')
    .then(user => {
      console.log(`IBU Suggestions for ${user.username}:
  ${suggestBeerIBU(user._id)}`);
    })
    .catch(err => {
      console.log(err);
    })

})

//router.post('/newUser', (req,res)=>{
//  const{username, password, country, province, street, number, email, zipCode, bestBeer, worstBeer, celebBeer, beerStyle, beerHead, beerGas, beerAlc, beerBitt}
//  const newUser = new User ({username, password, country, province, street, number, email, zipCode, bestBeer, worstBeer, celebBeer, beerStyle, beerHead, beerGas, beerAlc, beerBitt})
//  newUser.save()
//  .then ((user))=>{
//   res.redirect('/beers')
//  })
//  .catch(err=> console.log(err))
//})


module.exports = router;
