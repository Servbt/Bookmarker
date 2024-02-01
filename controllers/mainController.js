import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index.ejs');
});

// Add more routes as needed

export default router;
