const router = require('express').Router();
const { User } = require('../../models')

// * /api/user

// Get all users
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll();
        const users = userData.map((user) => user.get({ plain: true }));

        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Create new user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
