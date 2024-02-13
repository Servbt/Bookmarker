const router = require('express').Router();
const axios = require('axios').default;

const { Book, User, Review, Tag } = require('../models');
router.get('/', (req, res) => {
  let test = [];
  axios.get(`https://www.googleapis.com/books/v1/volumes?q=harry potter and the `)
    .then(response => {
      const bookArr = response.data.items;
      bookArr.forEach(item => {
        test.push(item.volumeInfo.title)
      });
      console.log(test);
      res.render('landing.ejs', { bookList: test });
    })
    .catch(err => console.log(err))
});

// render login page
router.get('/login', async (req, res) => {
  // redirect to home if user is logged in
  if (req.session.logged_in) {
    res.render('home.ejs');
    return;
  } else {
    const loginNeed = true;
    res.render('log-sign-page.ejs', { needLogin: loginNeed });
  }

});

// render signup page
router.get('/signup', async (req, res) => {
  res.render('log-sign-page.ejs');
});


//render homepage
router.get('/home', async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.redirect('/login');
      return;
    }
    // USER INFO
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });


    const user = userData.get({ plain: true });
    res.render('home.ejs', {
      user,
      logged_in: req.session.logged_in,
    })

  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
