const router = require('express').Router();
const axios = require('axios').default;

const { Book, User, Review, Tag } = require('../models');

router.get('/', (req, res) => {
    res.render('index.ejs');
});

// render login page
router.get('/login', async (req, res) => {
  // redirect to home if user is logged in
  if (req.session.logged_in) {
    res.redirect('/home');
    return;
  }
  res.render('login');
});

// render signup page
router.get('/signup', async (req, res) => {
  res.render('signup');
});



  module.exports = router;
