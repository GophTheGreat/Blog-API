const { Router } = require('express');
const router = Router();
const passport = require('passport');
const comment_controller = require('../controllers/commentController');

const authenticateJWT = passport.authenticate('jwt', { session: false });

//Comment routes

////GET all comments
router.get('/', comment_controller.comments_getAll);

////POST comment
router.post('/', authenticateJWT, comment_controller.comments_post);

////GET single comment
router.post('/:commentId', comment_controller.comments_getOne);

////PUT comment
router.put('/:commentId', comment_controller.comments_modify);

////DELETE comment
router.delete('/:commentId', comment_controller.comments_delete);

module.exports = router;