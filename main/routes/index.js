const express = require('express');
const router  = express.Router();
const Beer = require('../models/Beer');
const ConsumedBeer = require('../models/ConsumedBeers');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/beers', (req, res, next) => {
  Beer.find()
  .then(beers => {
    return res.render('beers', {beers});
  })
  .catch(err => {
    console.log(err);
    next();
  });
});

router.get('/onboarding', (req, res, next) =>{
  return res.render('onboarding');
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

module.exports = router;
