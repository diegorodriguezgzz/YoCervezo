const express = require('express');
const router = express.Router();
const Beer = require('../models/Beer');
const ConsumedBeers = require('../models/ConsumedBeers');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/onboarding', (req,res,next)=>
{
res.render('onboarding')
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
      userid : req.params.userid
    });
  })
  .catch(err => {
    console.log(err);
    next();
  });
});

router.post('/seleccion/:userid', (req, res, next) => {
  const {beers} = JSON.parse(Object.keys(req.body)[0]); //TODO: This is too messy see if refactor
  console.log(beers);
});

router.get('/onboarding', (req, res, next) => {

});


router.get('/beers/:id', (req, res, next) => {
  Beer.findById(req.params.id)
    .then(beer => {
      return res.render('beer-detail', beer);
    })
    .catch(err => {
      next();
    });
});

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
