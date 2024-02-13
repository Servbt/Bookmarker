const sequelize = require('../config/connection');
const { User, Book, Tag, Review } = require('../models');

const userData = require('./userData.json');
// const bookData = require('./bookData.json');
const reviewData = require('./reviewData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: false });
  const users = await User.bulkCreate(userData);
  // const books = await Book.bulkCreate(bookData);
  const reviews = await Review.bulkCreate(reviewData);
  // await User.bulkCreate(userData, {
  //   individualHooks: true,
  //   returning: true,

  process.exit(0);
};

seedDatabase();
