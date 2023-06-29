const router = require('express').Router();
const { Tutor, Review } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const tutorData = await Tutor.findAll({
      attributes: ['id', 'username'],
      order: ['username', 'DESC'],
    });

    const tutors = tutorData.map((tutor) =>
      tutor.get({ plain: true})
    );
    res.render('tutors', { tutors });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tutorProfile = await Tutor.findByPk(req.params.id, {
      attributes: ['id', 'name', 'email', 'description'],
      include: [
        {
          model: Review,
          attributes: ['title', 'text', 'user_id'],
        },
      ]
    });
  const tutor = tutorProfile.get({ plain: true});
  res.render('tutor', { tutor });
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