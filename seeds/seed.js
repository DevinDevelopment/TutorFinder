const sequelize = require('../config/connection');
const { User, Tutor, Review } = require('../models');

const userData = require('./userData.json');

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
