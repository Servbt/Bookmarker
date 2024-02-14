
const router = require("express").Router();
const { Review, User } = require("../../models");
const withAuth = require("../../utils/auth");

// makes and saves a review into the data base
router.post("/", withAuth, async (req, res) => {
  try {
    const newReview = await Review.create({
      ...req.body,
      user_id: req.session.user_id
    });
    res.status(200).json(newReview);
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
    res.status(200).json(reviews);
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

// gets all reviews for a single book
router.post("/recent-reviews", withAuth, async (req, res) => {
  let bookfound = req.body.book
  try {
    const reviews = await Review.findAndCountAll({ where: { book: bookfound } });
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

// updates a review's content or mark
router.post("/edit-review", withAuth, async (req, res) => {
  // grabs data from edit form
  let bookfound = req.body.book;
  let newReview = req.body.content;
  // let newMark = req.body.mark_read;
  try {
    // updates the review by finding it with the data we got from the edit form
    const review = await Review.update({ content: newReview, mark_read: newMark },
      { where: { book: bookfound, user_id: req.session.user_id } });
    res.status(200).json(review);
  } catch (err) {
    res.status(500).json(err);
  }
});

// route for deleting a review from database
router.delete("/delete-review", withAuth, async (req, res) => {
  let bookfound = req.body.book;
  try {
    const reviews = await Review.destroy(
      { where: { book: bookfound, user_id: req.session.user_id } }
    );
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;