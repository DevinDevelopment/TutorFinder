const router = require('express').Router();
const { Tutor } = require('../../models');

router.get('/', async (req, res) => {
  try {
    // if (!req.session.logged_in) {
    //   res.redirect('/login');
    //   return;
    // }
    //const userId = req.session.user_id;
    const tutorData = await Tutor.findAll({
      attributes: ['id', 'username'],
      order: [],
    });

    const tutorProfile = await User.findByPk(tutorId, {
      attributes: ['id', 'username', 'email', 'description'],
    });

    res.send(userProfile);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tutorProfile = await Tutor.findByPk(req.params.id, {
      attributes: ['id', 'name', 'email', 'description']
    });
  const tutor = tutorProfile.get({ plain: true});
  res.render('tutor', { tutor });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;