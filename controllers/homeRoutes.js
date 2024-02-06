const router = require('express').Router();
const axios = require('axios').default;

const { Book, User, Review, Tag } = require('../models');

router.get('/', (req, res) => {
  res.render('landing.ejs');
});

// render login page
router.get('/login', async (req, res) => {
  // redirect to home if user is logged in
  if (req.session.logged_in) {
    res.render('home.ejs');
    return;
  } else {
    const loginNeed = true;
    res.render('log-sign-page.ejs', {needLogin: loginNeed});
  }

});

// render signup page
router.get('/signup', async (req, res) => {
  res.render('log-sign-page.ejs');
});



module.exports = router;
