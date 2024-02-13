
const router = require("express").Router();
const { Review } = require("../../models");
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

router.get("/", withAuth, async (req, res) => {
  try {

    const reviews = await Review.findOne(
      { where: { user_id: req.session.user_id } }
    );
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json(err);
  }
});


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

module.exports = router;