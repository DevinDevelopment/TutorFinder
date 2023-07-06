const router = require('express').Router();
const { Tutor, Review } = require('../../models');
const withAuth = require('../../utils/auth');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images'); // Set the destination folder for storing the uploaded images
  },
  filename: function (req, file, cb) {
    // Generate a unique filename by adding a timestamp to the original filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

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

router.post('/', upload.single('profilePicture'), async (req, res) => {
  try {
    const profilePicturePath = req.file ? req.file.filename : null; // Retrieve the profile picture path

    const tutorData = await Tutor.create({
      ...req.body,
      profilePicture: profilePicturePath, // Assign the profile picture path to the tutor record
    });

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
      res.status(400).json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await tutorData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      res.status(200).json({ user: tutorData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tutorProfile = await Tutor.findByPk(req.params.id, {
      attributes: ['id', 'name', 'email', 'description'],
      include: {
        model: Review,
        attributes: ['id', 'title', 'text', 'user_id'],
      include: {
        model: User,
        attributes: ['name'],
      }
      }
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

// router.get('/:id/reviews', async (req, res) => {
//   try {
//     const tutorReviews = await Review.findAll({
//       where: { tutor_id: req.params.id },
//       attributes: ['id', 'title', 'text', 'user_id'],
//     });
    
//   const tutorReview = tutorReviews.map((tutor) =>
//     tutor.get({ plain: true})
//   );
//   res.render('tutorReview', { tutorReview });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

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