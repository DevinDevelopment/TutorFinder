const router = require('express').Router();
const studentRoutes = require('./studentRoutes');
const tutorRoutes = require('./tutorRoutes');
const logoutRoute = require('./logout');

router.use('/student', studentRoutes);
router.use('/tutor', tutorRoutes);
router.use('/logout', logoutRoute);

module.exports = router;