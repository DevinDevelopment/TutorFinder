const router = require('express').Router();
const { User } = require('../../models');

// ------- Student update description

router.put('/description', async (req, res) => {
  try {
    const userId = req.session.user_id;
    const descriptionData = await User.update({ description: req.body.desc}, 
      {where: {id : userId}}
      );

    res.status(200).json(descriptionData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
