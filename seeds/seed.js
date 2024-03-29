const sequelize = require('../config/connection');
const { User, Tutor, Review } = require('../models');

const userData = require('./userData.json');
const tutorData = require('./tutorData.json');
const reviewData = require('./reviewData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  })
  await Tutor.bulkCreate(tutorData, {
    individualHooks: true,
    returning: true,
  })
  await Review.bulkCreate(reviewData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
