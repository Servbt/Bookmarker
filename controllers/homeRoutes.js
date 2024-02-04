const router = require('express').Router();
const User = require('../models/User.js')

router.get('/', (req, res) => {
    res.render('index.ejs');
});


router.get('/users', async (req, res) => {
    try {
      const userData = await User.findAll();
      const users = userData.map((user) => user.get({ plain: true }));
      
      res.status(200).json(users);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  module.exports = router;
