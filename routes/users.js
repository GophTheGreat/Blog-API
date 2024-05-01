var express = require('express');
var router = express.Router();
const user_controller = require('../controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST create a user */
router.post('/', user_controller.users_create)

/* POST log in */
router.post('/login', user_controller.users_login)

/* POST log out */
router.post('/logout', user_controller.users_logout)

module.exports = router;
