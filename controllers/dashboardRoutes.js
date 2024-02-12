const router = require('express').Router();
const { Book, User, Review, Tag } = require('../models');
const withAuth = require('../utils/auth');

// render dashboard page
router.get('/', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID + include their associated Books
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      // include: [{ model: Book }, { model: Review }],
    });

    const user = userData.get({ plain: true });
    console.log(user);

    res.render('landing.ejs', {
      ...user,
      // reviews,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
