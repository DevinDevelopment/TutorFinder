const router = require('express').Router();
const { Tutor, Review } = require('../../models');
const withAuth = require('../../utils/auth');

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
      tutor_id: req.session.user_id,
    });

    res.status(200).json(newReview);
  } catch (err) {
    res.status(400).json(err);
  }
});

// ------- Tutor update description

router.put('/tutordescription', async (req, res) => {
  try {
    const tutorId = req.session.tutor_id;
    console.log(tutorId);
    const descriptionData = await Tutor.update({ description: req.body.tutorDesc}, 
      {where: {id : tutorId}}
      );
    res.status(200).json(descriptionData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;