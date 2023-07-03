const router = require('express').Router();
const { Tutor, Review } = require('../../models');
const withAuth = require('../../utils/auth');

// router.get('/', async (req, res) => {
//   try {
//     const tutorData = await Tutor.findAll({
//       attributes: ['id', 'name'],
//       //order: ['name', 'DESC'],
//     });
    
//     const tutors = tutorData.map((tutor) =>
//       tutor.get({ plain: true})
//     );
//     res.render('tutors', { tutors });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.post('/', async (req, res) => {
  try {
    const tutorData = await Tutor.create(req.body);

    req.session.save(() => {
      req.session.user_id = tutorData.id;
      req.session.logged_in = true;

      res.status(200).json(tutorData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const tutorData = await Tutor.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!tutorData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await tutorData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: tutorData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tutorProfile = await Tutor.findByPk(req.params.id, {
      attributes: ['id', 'name', 'email', 'description'],
    });
  const tutor = tutorProfile.get({ plain: true});
  res.render('tutor', { tutor });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  // try {
  //   const tutorReviews = await Review.findAll({
  //     where: { tutor_id: req.params.id },
  //     attributes: ['id', 'title', 'text', 'user_id'],
  //   });
  // const tutorReview = tutorReviews.get({ plain: true});
  // res.render('tutorReview', { tutorReview });
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).json(err);
  // }
});

router.get('/:id/reviews', async (req, res) => {
  try {
    const tutorReviews = await Review.findAll({
      where: { tutor_id: req.params.id },
      attributes: ['id', 'title', 'text', 'user_id'],
    });
    
  const tutorReview = tutorReviews.map((tutor) =>
    tutor.get({ plain: true})
  );
  res.render('tutorReview', { tutorReview });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/:id', withAuth, async (req, res) => {
  try {
    const newReview = await Review.create({
      title: req.body.title,
      text: req.body.text,
      tutor_id: req.params.id,
      user_id: req.session.user_id,
    });

    res.status(200).json(newReview);
  } catch (err) {
    res.status(400).json(err);
  }
  
});

module.exports = router;