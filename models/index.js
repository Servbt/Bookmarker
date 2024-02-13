const User = require('./User');
// const Book = require('./Book');
const Review = require('./Review');
// const Tag = require('./Tag');

// Book.belongsToMany(User, {
//   through: Tag,
//   unique: false,
// });

// User.belongsToMany(Book, {
//   through: Tag,
//   unique: false
// });

Review.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Review, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// Book.hasMany(Review, {
//   foreignKey: 'book_id',
//   onDelete: 'CASCADE'
// });

module.exports = {
  User,
  // Book,
  Review,
  // Tag,
};