const router = require('express').Router();
const { User, Tutor } = require('../../models');

// router.post('/', (req, res) => {
//     if (req.session.loggedIn) {
//       req.session.destroy(() => {
//         console.log('hi');
//         res.status(204).end();
//         res.clearCookie("key");
//       });
//     } else {
//       res.status(404).end();
//     }
//   });

router.get('/', function (req, res, next) {
    if (req.session.loggedIn) {
    res.clearCookie('user');
    req.session.destroy();
    util.response.ok(res, 'Successfully logged out.');
    }
});

module.exports = router;