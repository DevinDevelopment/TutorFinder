const router = require('express').Router();
const { User, Tutor } = require('../../models');
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

// ------ Student login routes

router.post('/studentsignup', upload.single('profilePicture'), async (req, res) => {
  try {
    const profilePicturePath = req.file ? req.file.filename : null; // Retrieve the profile picture path

    const studentData = await User.create({
      ...req.body,
      profilePicture: profilePicturePath, // Assign the profile picture path to the tutor record
    });

    req.session.save(() => {
      req.session.user_id = studentData.id;
      req.session.logged_in = true;
      res.status(200).json(studentData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/studentlogin', async (req, res) => {
    try {
        const studentData = await User.findOne({
          where: {
            email: req.body.email,
          },
        });
    
        if (!studentData) {
          res.status(400).json({ message: 'Incorrect email or password. Please try again!' });
          return;
        }
    
        const validPassword = await studentData.checkPassword(req.body.password);
    
        if (!validPassword) {
          res.status(400).json({ message: 'Incorrect email or password. Please try again!' });
          return;
        }
        req.session.save(() => {
          req.session.user_id = studentData.id;
          res.status(200).json({ user: studentData, message: 'You are now logged in!' });
            console.log("signed in!")
        });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
});

// ------ Tutor login routes

router.post('/tutorsignup', upload.single('profilePicture'), async (req, res) => {
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
  
  router.post('/tutorlogin', async (req, res) => {
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
        // req.session.loggedIn = true;
        req.session.user_id = tutorData.id;
        res.status(200).json({ user: tutorData, message: 'You are now logged in!' });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

router.post('/logout', (req, res) => {
  // When the user logs out, destroy the session
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;