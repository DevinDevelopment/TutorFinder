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
});

router.post('/:id/addReview', async (req, res) => {
  try {
    console.log('post test');
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

  // ------- Tutor update description

router.put('/description', async (req, res) => {
  try {
    const userId = req.session.user_id;
    const descriptionData = await User.update({ description: req.body.desc}, 
      {where: {id : userId}}
      );

    res.status(200).json(descriptionData);
  } catch (err) {
    res.status(400).json(err);
  }
});
});

module.exports = router;