const router = require('express').Router();
const axios = require('axios').default;

const { Book, User, Review, Tag } = require('../models');

// home page, calling google api for a sample selection of books
router.get('/', async (req, res) => {
  try {
    let books = [];

    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=harry potter and the `);
    
    // getting each book
    const bookArr = response.data.items;
    bookArr.forEach(item => {
      books.push(item);
    });

    // console.log(books[0].volumeInfo.title);
    res.render('landing.ejs', { bookList: books });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
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


    let books = [];

    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=harry potter and the `);
    
    // getting each book this part is for test purposes
    const bookArr = response.data.items;
    bookArr.forEach(item => {
      books.push(item);
    });

    // console.log(books[0].volumeInfo.title);
    // res.render('landing.ejs', { bookList: books });

    const user = userData.get({ plain: true });

    // will use this later
    res.render('home.ejs', {
      user,
      logged_in: req.session.logged_in,
      bookList: books
    })

  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
