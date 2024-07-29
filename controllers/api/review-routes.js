const router = require("express").Router();
const { Review, User } = require("../../models");
const axios = require('axios').default;
const withAuth = require("../../utils/auth");

// makes and saves a review into the data base
router.post("/", withAuth, async (req, res) => {
  try {
    let book = req.body.book;
    let content = req.body.content;
    let mark_read = req.body.btncheck1;

    if (mark_read == undefined) {
      mark_read = false;
    } else {
      mark_read = true;
    };

    const newReview = await Review.create({
      book,
      content,
      mark_read,
      user_id: req.session.user_id
    });

    // console.log("THIS IS A BOOOOKKKK!!!!!" + book);
    // console.log("THIS IS A REVIEWW!!!!!" + newReview);
    // console.log("THIS IS A CONTENNTTT!!!!!" + content);
    // console.log("THIS IS A MARKKKK!!!!!" + mark_read);
    // res.status(200).json(newReview);
  } catch (err) {
    res.status(500).json(err);
  }
});

// gets client's review for a single book
router.post("/find", withAuth, async (req, res) => {
  let bookfound = req.body.book
  try {
    const reviews = await Review.findOne(
      {
        where: {
          book: bookfound,
          user_id: req.session.user_id
        }
      }
    );
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Gets all review data for client
router.get("/all", withAuth, async (req, res) => {
  try {

    const reviews = await Review.findAll(
      { where: { user_id: req.session.user_id } }
    );
    // make an array with just book IDs
    let test = [];
    reviews.forEach(review => {
      test.push(review.book)
    });

    // make an array filled with book info from those arrays
    const requests = test.map(book => {
      return axios.get(`https://www.googleapis.com/books/v1/volumes/${book}`)
    });

    const results = await Promise.all(requests);
    const responseData = results.map(result => result.data);

  res.render('reviews.ejs',
      { reviews: reviews, 
        logged_in: req.session.user_id,
        bookData: responseData
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Gets all Mark data for client ()
router.get("/all-marks", withAuth, async (req, res) => {
  try {

    const reviews = await Review.findAll(
      { where: { user_id: req.session.user_id } }
    );
    // make an array with just book IDs
    let test = [];
    reviews.forEach(review => {
      test.push(review.book)
    });

    // make an array filled with book info from those arrays
    const requests = test.map(book => {
      return axios.get(`https://www.googleapis.com/books/v1/volumes/${book}`)
    });

    const results = await Promise.all(requests);
    const responseData = results.map(result => result.data);

  res.render('marks.ejs',
      { reviews: reviews, 
        logged_in: req.session.user_id,
        bookData: responseData
      });
  } catch (err) {
    res.status(500).json(err);
  }
});


// Gets all review data for a certain user
router.post("/user-all", async (req, res) => {
  let userFound = req.body.name
  try {
    // first we find the user via their name
    const user = await User.findOne({
      where: { name: userFound },
      attributes: {
        exclude: ['password']
      }
    }
    );
    // then when get the user we capture the ID and use it to filter out the reviews
    const reviews = await Review.findAll(
      { where: { user_id: user.id } }
    );
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json(err);
  }
});

// gets all reviews for a single book ***MIGHT BE REDUNDANT***
router.post("/book-reviews", withAuth, async (req, res) => {
  let bookfound = req.body.book
  try {
    const reviews = await Review.findAll({ where: { book: bookfound } });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json(err);
  }
});


// gets all reviews
router.get("/all-reviews", async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Gets client to Review Mark Page, goes to editBook.ejs
router.get('/:id', async (req, res) => {
  const review = await Review.findAll(
    { where: { id: req.params.id } }
);
    // target id from book clicked (post request made from bookIDfind.js) 
    let bookID = review[0].book;
    const reviews = await Review.findAll({ where:{ book: bookID } });
    // getting all data for one book
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookID}`);
    const bookData = response.data;

    res.render('editBook.ejs', { 
      singleBook: bookData ,
       logged_in: req.session.logged_in,
       reviews: reviews,
       reviewData: review[0]
      });

});


// updates a review's content or mark
router.post("/edit-review", withAuth, async (req, res) => {
  // grabs data from edit form
  let bookfound = req.body.book;
  let newReview = req.body.content;
  let newMark = req.body.btncheck1;

  if (newMark == undefined) {
    newMark = false;
  } else {
    newMark = true;
  };


  try {
    // updates the review by finding it with the data we got from the edit form
    const review = await Review.update({ content: newReview, mark_read: newMark },
      { where: { book: bookfound, user_id: req.session.user_id } });
    // res.status(200).json(review);
  } catch (err) {
    res.status(500).json(err);
  }
});

// route for deleting a review from database
router.get("/delete-review/:id", withAuth, async (req, res) => {
  let bookfound = req.params.id;
  try {
    const reviews = await Review.destroy(
      { where: { id: bookfound, user_id: req.session.user_id } }
    );
    // res.status(200).json(bookfound);
    res.redirect("/api/review/all");
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;