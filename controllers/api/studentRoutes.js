const router = require('express').Router();
const { User } = require('../../models');


// router.get('/', async (req, res) => {
//   try {
//     // if not logged in
//     if (!req.session.logged_in) {
//       res.redirect('/login');
//       return;
//     }
//     // userId = id for users
//     const userId = req.session.user_id;
//     //
//     const userProfile = await User.findbyPk({ userId,
//       include: ['id','username','email','description']});
//     // const userProfile = await User.findAll({
//     //   include: [{model: User, attributes: ['id','username','email','description']}]});
    
//     // Serialize data so the template can read it
//     const user = userProfile.map((user) => user.get({ plain: true }));
//     console.log(user);
//     // Pass serialized data and session flag into template
//     res.render('user', { 
//       user,
//       layout: 'main'
//       // logged_in: req.session.logged_in 
//     });
//     // res.status(200).json(tutorData);
//   } catch (err) {
//     res.status(500).json(err);
//   }

  // ------ Student login routes

  router.post('/', async (req, res) => {
    try {
      const studentData = await User.create(req.body);
  
      req.session.save(() => {
        req.session.user_id = studentData.id;
        req.session.logged_in = true;
        res.status(200).json(studentData);
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.post('/login', async (req, res) => {
    try {
      const studentData = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
  
      if (!studentData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password. Please try again!' });
        return;
      }
  
      const validPassword = await studentData.checkPassword(req.body.password);
  
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
          .json({ user: studentData, message: 'You are now logged in!' });
          console.log("signed in!")
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });


// });

module.exports = router;
