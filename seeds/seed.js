// import { User, Book, Tag, Review }  from '../models/index.js';
import User from '../models/User.js'
import Book from '../models/Book.js'
import Review from '../models/Review.js'
// import sequelize from '../config/connection.js';
// const sequelize = await import(`file:///C:/Users/arian/Documents/Development/My%20projects/BookMarker/config/connection`);
import userData  from './userData.json' assert { type: "json" };
import reviewData  from './reviewData.json' assert { type: "json" };
import bookData  from './bookData.json' assert { type: "json" };

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
