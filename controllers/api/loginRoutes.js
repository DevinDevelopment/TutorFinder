const router = require('express').Router();
const { User, Tutor } = require('../../models');
const withAuth = require('../../utils/auth');

// ------ Student login routes

router.post('/studentsignup', async (req, res) => {
    try {
        const userData = await User.create(req.body);
    
        req.session.save(() => {
          req.session.user_id = userData.id;
          req.session.logged_in = true;
    
          res.status(200).json(userData);
        });
      } catch (err) {
        res.status(400).json(err);
      }
    });

router.post('/studentlogin', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });
    
        if (!userData) {
          res
            .status(400)
            .json({ message: 'Incorrect email or password, please try again' });
          return;
        }
    
        const validPassword = await userData.checkPassword(req.body.password);
    
        if (!validPassword) {
          res
            .status(400)
            .json({ message: 'Incorrect email or password, please try again' });
          return;
        }
    
        req.session.save(() => {
          req.session.user_id = userData.id;
          req.session.logged_in = true;
          
          res.json({ user: userData, message: 'You are now logged in!' });
        });
    
      } catch (err) {
        res.status(400).json(err);
      }
    });

// ------ Tutor login routes

router.post('/tutorsignup', async (req, res) => {
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
  
  router.post('/tutorlogin', async (req, res) => {
    try {
        const tutorData = await Tutor.findOne({ where: { email: req.body.email } });
    
        if (!tutorData) {
          res
            .status(400)
            .json({ message: 'Incorrect email or password, please try again' });
          return;
        }
    
        const validPassword = await tutorData.checkPassword(req.body.password);
    
        if (!validPassword) {
          res
            .status(400)
            .json({ message: 'Incorrect email or password, please try again' });
          return;
        }
    
        req.session.save(() => {
          req.session.user_id = tutorData.id;
          req.session.logged_in = true;
          
          res.json({ user: tutorData, message: 'You are now logged in!' });
        });
    
      } catch (err) {
        res.status(400).json(err);
      }
    });

  router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

module.exports = router;