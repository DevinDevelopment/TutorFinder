const router = require('express').Router();
const { User } = require('../../models');

router.get('/profile', async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.redirect('/login');
      return;
    }

    const userId = req.session.user_id;

    const userProfile = await User.findByPk(userId, {
      attributes: ['id', 'username', 'email', 'description', 'review_id'],
    });

    res.send(userProfile);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
