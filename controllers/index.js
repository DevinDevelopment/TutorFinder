const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes')
// const studentLoginRoutes = require('./studentLogin')
// const tutorLoginRoutes = require('./tutorLogin')

router.use('/', homeRoutes);
router.use('/api', apiRoutes);



module.exports = router;
