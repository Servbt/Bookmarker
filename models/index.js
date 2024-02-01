import User from './User';
import Book from'./Book';
import Review from'./Review';
import Tag from'./Tag';

Book.belongsToMany(User, {
  through: Tag,
  unique: false,
});

User.belongsToMany(Book, {
  through: Tag,
  unique: false
});

Review.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Review, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Book.hasMany(Review, {
  foreignKey: 'book_id',
  onDelete: 'CASCADE'
});

export default {
  User,
  Book,
  Review,
  Tag,
};