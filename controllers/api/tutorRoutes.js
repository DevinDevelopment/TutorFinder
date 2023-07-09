const router = require('express').Router();
const { Tutor, Review, User } = require('../../models');

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
    const { title, text } = req.body;
    const tutorId = req.params.id;
    const userId = req.session.user_id;
    
    const newReview = await Review.create({
      include: {
        model: User,
      },
      title,
      text,
      tutor_id: tutorId,
      user_id: userId,
      logged_in: req.session.logged_in,
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
    const descriptionData = await Tutor.update({ description: req.body.tutorDesc}, 
      {where: {id : tutorId}}
      );
    res.status(200).json(descriptionData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;