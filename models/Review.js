const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Review extends Model {
}

Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      reference: {
        model: 'user',
        key: 'id'
      }
    },
    tutor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      reference: {
        model: 'tutor',
        key: 'id'
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'review',
  }
);

module.exports = Review;
