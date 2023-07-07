const router = require('express').Router();
const studentRoutes = require('./studentRoutes');
const tutorRoutes = require('./tutorRoutes');
const loginRoutes = require('./loginRoutes');

router.use('/student', studentRoutes);
router.use('/tutor', tutorRoutes);
router.use('/login', loginRoutes);

module.exports = router;