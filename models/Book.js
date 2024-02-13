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
      allowNull: false,
      unique: true
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
      type: DataTypes.STRING(1234)
    },
    description: {
      type: DataTypes.STRING(1234)
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