const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Tag extends Model { };

Tag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
        unique: false
      }
    },
    book_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'books',
        key: 'id',
        unique: false
      }
    },
    review_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'reviews',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'tag'
  }
);

module.exports = Tag;