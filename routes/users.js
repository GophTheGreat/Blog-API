var express = require('express');
var router = express.Router();
const user_controller = require('../controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', user_controller.users_login)

module.exports = router;
