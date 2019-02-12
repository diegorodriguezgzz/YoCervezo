const express = require("express");
const passportRouter = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');
const ensureLogin = require('connect-ensure-login');

//Bcrypt
const bcryptSalt = 10;


passportRouter.get('/signup', (req, res, next) => {
  res.render('passport/signup');
});

passportRouter.post('/signup', (req, res, next) => {
  const { username, password } = req.body;

  if (username === "" || password === "") {
    res.render('passport/signup', {
      message: "Please input a username and password."
    });
    return;
  }

  User.find({ username: username })
    .then(user => {
      if (user.username !== undefined) {
        res.render('passport/signup', {
          message: "That user already exists."
        });
        return;
      } else {
        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashPass = bcrypt.hashSync(password, salt);

        const newUser = new User({
          username,
          password: hashPass
        });

        newUser.save()
          .then((user) => {
            console.log("New user saved!")
            res.redirect(`/seleccion/${user._id}`);
          })
          .catch(err => {
            console.log(err);
            next();
          });
      }

    })
    .catch(err => {
      console.log(err);
      next();
    });
});

passportRouter.get('/login', (req, res, next) => {
  res.render('passport/login', { "message" : req.flash("error")});
});

passportRouter.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

// passportRouter.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
//   res.render("passport/private", { user: req.user });
// });

module.exports = passportRouter;