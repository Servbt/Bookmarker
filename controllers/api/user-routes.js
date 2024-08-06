const router = require('express').Router();
const { User, Review, Book } = require('../../models');
const axios = require('axios').default;
const myKey = 'AIzaSyAWkq6glcnzeDFA_dtgJORBns4mhh1K9Vk';



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
            res.redirect("/home");
            // res.status(200).json(userData);
        });
    } catch (err) {
        const loginNeed = false;
        res.render('log-sign-page.ejs', { needLogin: loginNeed, message: 'Please Use a valid Password' });

    }
});

// User login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: { email: req.body.email },
        });

        if (!userData) {
            const loginNeed = true;
            res.render('log-sign-page.ejs', { needLogin: loginNeed, message: 'Incorrect email or password, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            const loginNeed = true;
            res.render('log-sign-page.ejs', { needLogin: loginNeed, message: 'Incorrect email or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            // takes user to home page after successful login
            res.redirect("/home");
            // res.json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// Logout user
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy((err) => {
            if (err) {
                console.error('Failed to destroy session:', err);
                res.status(500).end();
            } else {
                // Redirect user to landing page
                res.redirect('/');
            }
        });
    } else {
        res.status(404).end();
    }
});


// Get single user by id
router.get('/:id', async (req, res) => {
    try {

        // get user from singleBook.ejs reviews portion
        const userData = await User.findByPk(req.params.id, {
            attributes: {
                exclude: ['password'],
            },
        });

        // find all reviews from given user data   
        const reviews = await Review.findAll(
            { where: { user_id: userData.id } }
        );
        // make an array with just book IDs
        let test = [];
        
        reviews.forEach(review => {
            test.push(review.book)
        });

        // make an array filled with book info from those arrays
        const requests = test.map(book => {
            return axios.get(`https://www.googleapis.com/books/v1/volumes/${book}?key=${myKey}`)
        });
        // same functionality from review-routes.js
        const results = await Promise.all(requests);
        const responseData = results.map(result => result.data);


        if (!userData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        };

        res.render('reviews.ejs',
            {
                reviews: reviews,
                logged_in: req.session.user_id,
                bookData: responseData,
                userData: userData
            });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get single user by id
router.get('/user-marks/:id', async (req, res) => {
    try {

        // get user from singleBook.ejs reviews portion
        const userData = await User.findByPk(req.params.id, {
            attributes: {
                exclude: ['password'],
            },
        });

        // find all reviews from given user data   
        const reviews = await Review.findAll(
            { where: { user_id: userData.id } }
        );
        // make an array with just book IDs
        let test = [];
        reviews.forEach(review => {
            test.push(review.book)
        });

        // make an array filled with book info from those arrays
        const requests = test.map(book => {
            return axios.get(`https://www.googleapis.com/books/v1/volumes/${book}?key=${myKey}`)
        });
        // same functionality from review-routes.js
        const results = await Promise.all(requests);
        const responseData = results.map(result => result.data);


        if (!userData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        };

        res.render('marks.ejs',
            {
                reviews: reviews,
                logged_in: req.session.user_id,
                bookData: responseData,
                userData: userData
            });
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;
