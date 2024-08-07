const router = require('express').Router();
const axios = require('axios').default;

const { Sequelize } = require('sequelize');
const { Book, User, Review, Tag } = require('../models');
const myKey = 'AIzaSyAWkq6glcnzeDFA_dtgJORBns4mhh1K9Vk';


// home page, calling google api for a sample selection of books
router.get('/', async (req, res) => {
  try {
    let books = [];

    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=harry Pottter&key=${myKey}`);
    const bookArr = response.data.items;

    // getting each book
    for (let index = 0; index < 3; index++) {
      books.push(bookArr[index])
      
    }
    // bookArr.forEach(item => {
    //   books.push(item);
    // });

    // console.log(books[0].volumeInfo.title);
    res.render('landing.ejs', { bookList: books, });
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

    const recentReviews = await Review.findAll({
      order: [
        ["date_created", "DESC"]
      ]
    });

    
    let randReviews = [];
    
 

    recentReviews.forEach(review => {
      let rand = Math.random();
      let randomArray = Math.floor(rand * recentReviews.length);
      randReviews.push(recentReviews[randomArray]);
    });
    // res.json(randReviews);

    let books = [];
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=harry Pottter&key=${myKey}`);

    const bookArr = response.data.items;

    for (let index = 0; index < 3; index++) {
      books.push(bookArr[index])
      
    }

    // getting each book
    // bookArr.forEach(item => {
    //   books.push(item);
    // });

    const user = userData.get({ plain: true });
    res.render('home.ejs', {
      user,
      logged_in: req.session.logged_in,
      bookList: books
    });

  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
