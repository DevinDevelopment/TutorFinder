const router = require('express').Router();
const userRoutes = require('./userRoutes');
const tutorRoutes = require('./tutorRoutes');
const loginRoutes = require('./loginRoutes');

router.use('/users', userRoutes);
router.use('/tutors', tutorRoutes);
router.use('/login', loginRoutes);


module.exports = router;