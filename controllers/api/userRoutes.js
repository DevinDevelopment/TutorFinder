// const router = require('express').Router();
// const { User } = require('../../models');

// router.get('/profile/:id', async (req, res) => {
//   try {
//     if (!req.session.logged_in) {
//       res.redirect('/login');
//       return;
//     }
//     const userId = req.session.user_id;
    
//     const userProfile = await User.findByPk(userId, {
//       attributes: ['id', 'username', 'email', 'description'],
//     });

//     if (!userProfile) {
//       res.status(404).json({ message: 'User not found' });
//       return;
//     }

//     res.render('profile', {
//       layout: 'main',
//       logged_in: true,
//       username: userProfile.username,
//       email: userProfile.email,
//       description: userProfile.description,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;
