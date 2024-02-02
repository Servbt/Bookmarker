import { Model, DataTypes }  from '../../node_modules/sequelize/lib/index.js';
import sequelize  from '../config/connection';
// import User  from './User';
// import Game  from './Game';

class Review extends Model { }

Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mark_read: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    date_created: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    book_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'books',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'review'
  }
);

export default Review;