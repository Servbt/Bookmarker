const router = require('express').Router();
const { Book, User, Review, Tag } = require('../models');
const axios = require('axios').default;
const withAuth = require('../utils/auth');

// render dashboard page
router.get('/', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID + include their associated Books
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      // TODO: just get the reviews the books I can find through the api later with just the id's collected
      // include: [{ model: Book }, { model: Review }],
    });

    const user = userData.get({ plain: true });
    // console.log(user);

    res.render('landing.ejs', {
      ...user,
      // reviews,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// route for search results book page
router.post('/search', async (req, res) => {
  try {
    let booksrch = req.body.book;
    console.log(booksrch);
    let searchList = [];

    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${booksrch}`);

    // getting each book
    const bookArr = response.data.items;
    bookArr.forEach(item => {
      searchList.push(item);
    });

    console.log(searchList[1].volumeInfo.title);
    res.render('landing.ejs', { bookList: searchList });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// route for single result book page    
router.post('/singleBook', async (req, res) => {
  try {
    // target id from book clicked (post request made from bookIDfind.js) 
    let bookID = req.body.book;
    // find all reviews for book that was clicked on
    // console.log(bookID);
    const reviews = await Review.findAll({ where:{ book: bookID } });
    // console.log(reviews);

    // getting all data for one book
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookID}`);
    const bookData = response.data;


    // console.log(reviews);
    res.render('singleBook.ejs', { 
      singleBook: bookData ,
       logged_in: req.session.logged_in,
       reviews: reviews
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
