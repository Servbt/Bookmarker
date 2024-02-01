import sequelize  from '../config/connection';
import { User, Book, Tag, Review }  from '../models';

import userData  from './userData.json';
import reviewData  from './reviewData.json';
import bookData  from './bookData.json';

const seedDatabase = async () => {
  await sequelize.sync({ force: false });
  const users = await User.bulkCreate(userData);
  const books = await Book.bulkCreate(bookData);
  const reviews = await Review.bulkCreate(reviewData);
  // await User.bulkCreate(userData, {
  //   individualHooks: true,
  //   returning: true,

  process.exit(0);
};

seedDatabase();
