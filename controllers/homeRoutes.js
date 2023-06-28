const router = require('express').Router();
const { Review, User, Tutor } = require('../models');
const sequelize = require('../config/connection');

router.get('/', async (req, res) => {
  try {
    const tutorData = await Tutor.findAll({
      include: { model: Review },
      order: [
        [sequelize.literal('RAND()')]
      ],
      limit: 1,
    });

    // Serialize data so the template can read it
    const tutors = tutorData.map((tutor) => tutor.get({ plain: true }));
    console.log(tutors);
    // Pass serialized data and session flag into template
    res.render('homepage', { 
      tutors, 
      // logged_in: req.session.logged_in 
    });
    // res.status(200).json(tutorData);
  } catch (err) {
    res.status(500).json(err);
  }
});
  
  module.exports = router;