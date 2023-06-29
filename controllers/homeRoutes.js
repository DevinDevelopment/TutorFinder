const router = require('express').Router();
const { Review, User, Tutor } = require('../models');
const sequelize = require('../config/connection');

router.get('/', async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      include: [{ model: Tutor }, { model: User }],
      order: [
        [sequelize.literal('RAND()')]
      ],
      limit: 3,
    });

    // Serialize data so the template can read it
    const reviews = reviewData.map((review) => review.get({ plain: true }));
    console.log(reviews);
    // Pass serialized data and session flag into template
    res.render('homepage', { 
      reviews, 
      // logged_in: req.session.logged_in 
    });
    // res.status(200).json(tutorData);
  } catch (err) {
    res.status(500).json(err);
  }
});
  
module.exports = router;