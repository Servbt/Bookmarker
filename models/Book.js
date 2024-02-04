const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
class Book extends Model { }

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    book: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING,
    },
    publish_date: {
      type: DataTypes.INTEGER
    },
    page_count: {
      type: DataTypes.INTEGER
    },
    thumbnail: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'book'
  }
);

module.exports = Book;