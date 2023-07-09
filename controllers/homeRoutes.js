const router = require('express').Router();
const { Review, User, Tutor } = require('../models');
const sequelize = require('../config/connection');
const { Op } = require('sequelize');

// ------ homepage when (signedout) / (student signed in)

router.get('/', async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      include: [{ model: Tutor }, { model: User }],
      order: [
        [sequelize.literal('RAND()')]
      ],
      limit: 3,
    });

    const reviews = reviewData.map((review) => review.get({ plain: true }));

    res.render('homepage', { 
      reviews, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ------ tutors home page

router.get('/tutorshomepage', async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      include: { model: Tutor },
      order: [
        [sequelize.literal('RAND()')]
      ],
      limit: 3,
    });

    const reviews = reviewData.map((review) => review.get({ plain: true }));

    res.render('tutorsHomepage', { 
      reviews, 
      logged_in: req.session.logged_in ,
      layout: 'main2'
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/tutors', async (req, res) => {
  try {
    const tutorData = await Tutor.findAll({
      attributes: ['id', 'name'],
    });
    
    const tutors = tutorData.map((tutor) =>
      tutor.get({ plain: true})
    );
    res.render('tutors', { tutors, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ----- Tutors page route

router.get('/tutor/:id', async (req, res) => {
  try {
    const tutorData = await Tutor.findByPk(req.params.id, {
      include: { model: Review },
    });

    const tutor = tutorData.get({ plain: true });
    res.render('tutor', { tutor, logged_in: req.session.logged_in });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// ----- Student profile

router.get('/profile', async (req, res) => {
  try {
    const userId = req.session.user_id;
    const userProfile = await User.findByPk( userId, {
      include: { model: Review },
      layout: 'main',
    });

    const user = userProfile.get({ plain: true });
    res.render('userProfile', { 
      user, 
      logged_in: req.session.logged_in,  
      layout: 'main',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// ------ Search bar route
router.get('/tutorprofile', async (req, res) => {
  try {
    const tutorId = req.session.tutor_id;
    const tutorProfile = await Tutor.findByPk( tutorId, {
      include: { model: Review },
    });

    const tutor = tutorProfile.get({ plain: true });
    res.render('tutorProfile', { 
      tutor, 
      logged_in: req.session.logged_in,
      layout: 'main2',  
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  try {
    res.render('login', {
        layout: 'LoginNav'
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
