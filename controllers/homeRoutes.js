const router = require('express').Router();
const { Review, User, Tutor } = require('../models');
const sequelize = require('../config/connection');

// ------ main page routes

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
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ------ All tutors page routes

router.get('/tutors', async (req, res) => {
  try {
    const tutorData = await Tutor.findAll({
      attributes: ['id', 'name'],
      //order: ['name', 'DESC'],
    });
    
    const tutors = tutorData.map((tutor) =>
      tutor.get({ plain: true})
    );
    res.render('tutors', { tutors, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ------ tutor profile route '/tutors/profile

// ------ Student login routes

router.get('/studentLogin', async (req, res) => {
  try {
    res.render('studentLogin', {
        layout: 'login'
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ------ Tutor login routes

router.get('/tutorLogin', async (req, res) => {
  try {
    res.render('tutorLogin', {
        layout: 'Login'
    });

    // res.status(200).json(tutorData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ----- Tutor page route

router.get('/tutor/:id', async (req, res) => {
  try {
    const tutorData = await Tutor.findByPk(req.params.id, {
      include: { model: Review },
    });

    const tutor = tutorData.get({ plain: true });
    res.render('tutor', { tutor });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// ----- Profile page route

router.get('/profile', async (req, res) => {
  try {
    const userId = req.session.user_id;
    const userProfile = await User.findbyPk( userId, {
      include: ['id','username','email','description']});

    const user = userProfile.get({ plain: true });
    res.render('userProfile', { user });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;