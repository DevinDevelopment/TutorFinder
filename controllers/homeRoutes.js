const router = require('express').Router();
const { Review, User, Tutor } = require('../models');
const sequelize = require('../config/connection');

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
      include: [{ model: Tutor }, { model: User }],
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

router.get('/tutorProfile', async (req, res) => {
  try {
    res.render('tutorProfile', {
        layout: 'main2'
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

// ----- Student profile

router.get('/profile', async (req, res) => {
  try {
    const userId = req.session.user_id;
    const userProfile = await User.findByPk( userId, {
      include: { model: Review },
      layout: 'main'
    });

    const user = userProfile.get({ plain: true });
    res.render('userProfile', { user });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// ----- Tutor profile

router.get('/tutorprofile', async (req, res) => {
  try {
    const tutorId = req.session.user_id;
    const tutorProfile = await Tutor.findByPk( tutorId, {
      include: { model: Review },
      layout: 'main2'
    });

    const tutor = tutorProfile.get({ plain: true });
    res.render('tutorProfile', { tutor });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// ------ Search bar route
router.get('/tutor', async (req, res) => {
  try {
    const userProfile = await User.findOne({ where: { name: tutorName} });

    const user = userProfile.get({ plain: true });
    res.render('userProfile', { user });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;