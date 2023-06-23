const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Review extends Model {
//   checkPassword(loginPw) {
//     return bcrypt.compareSync(loginPw, this.password);
//  }
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
      validate: {
        len: [2,15]
      }
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10,350]
      },
    },
    user_id: {
      type: DataTypes.INT,
      allowNull: false,
      reference: {
        model: 'user',
        key: 'id'
      }
    },
    tutor_id: {
      type: DataTypes.INT,
      allowNull: false,
      reference: {
        model: 'tutor',
        key: 'id'
      }
    },
  },
  {
    // hooks: {
    //   beforeCreate: async (newUserData) => {
    //     newUserData.password = await bcrypt.hash(newUserData.password, 10);
    //     return newUserData;
    //   },
    // },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'review',
  }
);

module.exports = Review;
