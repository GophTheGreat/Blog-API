const { Router } = require('express');
const router = Router();
const passport = require('passport');
const comment_controller = require('../controllers/commentController');

const authenticateJWT = passport.authenticate('jwt', { session: false });

//Comment routes

////GET all comments
router.get('/:postId/comments', comment_controller.comments_getAll);

////POST comment
router.post('/:postId/comments', authenticateJWT, comment_controller.comments_post);

////GET single comment
router.post('/:postId/comments/:commentId', comment_controller.comments_getOne);

////PUT comment
router.put('/:postId/comments/:commentId', authenticateJWT, comment_controller.comments_modify);

////DELETE comment
router.delete('/:postId/comments/:commentId', authenticateJWT, comment_controller.comments_delete);

module.exports = router;