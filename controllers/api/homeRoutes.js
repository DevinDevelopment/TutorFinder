const router = require('express').Router();
const Reviews = require('../../models/Review');
const User = require('../../models/Review');

router.get('/', async (req, res) => {
    try {
      const UserData = await User.findAll({
        include: [{ model: User }, { model: Reviews }],
      });
      res.status(200).json(UserData);
    } 
    catch (err) {
      res.status(500).json(err);
    }
  });