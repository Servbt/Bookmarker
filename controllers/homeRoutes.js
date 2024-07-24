const router = require('express').Router();
const axios = require('axios').default;

const { Book, User, Review, Tag } = require('../models');

// home page, calling google api for a sample selection of books
router.get('/', async (req, res) => {
  try {
    let test = [];

    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=harry potter and the `);
    
    // getting each book
    const bookArr = response.data.items;
    bookArr.forEach(item => {
      test.push(item);
    });

    console.log(test[0].volumeInfo.title);
    res.render('landing.ejs', { bookList: test });
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


    const user = userData.get({ plain: true });
    res.render('home.ejs', {
      user,
      logged_in: req.session.logged_in,
    })

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
    let bookID = req.body.book;
    console.log("THIS IS THE ID OF THE BOOK" + bookID);

    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookID}`);
    
    // getting each book
    const bookData = response.data.volumeInfo;


    // console.log(bookData);
    res.render('singleBook.ejs', { singleBook: bookData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
