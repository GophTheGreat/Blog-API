var express = require('express');
var router = express.Router();
const user_controller = require('../controllers/userController');
const passport = require('passport');
const authenticateJWT = passport.authenticate('jwt', { session: false });

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST create a user */
router.post('/', user_controller.users_create)

/* POST log in */
router.post('/login', user_controller.users_login)

module.exports = router;
