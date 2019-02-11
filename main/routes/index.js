const express = require('express');
const router  = express.Router();
const Beer = require('../models/Beer');

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
    return res.render('beers', {beers});
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
