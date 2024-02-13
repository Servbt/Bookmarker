
const router = require("express").Router();
const { Review, User } = require("../../models");
const withAuth = require("../../utils/auth");

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

// gets single review 
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
    const user = await User.findOne(
      {
        where: {
          name: userFound
        },
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
    const reviews = await Review.findAndCountAll(
      {
        where:
        {
          book: bookfound
        }
      }
    );
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


module.exports = router;