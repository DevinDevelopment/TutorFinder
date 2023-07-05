const router = require('express').Router();
const studentRoutes = require('./studentRoutes');
const tutorRoutes = require('./tutorRoutes');

router.use('/student', studentRoutes);
router.use('/tutor', tutorRoutes);

module.exports = router;