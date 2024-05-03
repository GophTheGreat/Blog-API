var express = require('express');
const router = express.Router();
const passport = require('passport');
const post_controller = require('../controllers/postController')

const authenticateJWT = passport.authenticate('jwt', { session: false });

//Post routes
////GET all posts
router.get('/', post_controller.posts_getAll);

////POST post for creating a new post 
router.post('/', authenticateJWT, post_controller.posts_post);

////GET individual post
router.get('/:id', post_controller.posts_getOne)

////PUT post
router.put('/:id', authenticateJWT, post_controller.posts_modify);

////DELETE post
router.delete('/:id', post_controller.posts_delete);

module.exports = router;