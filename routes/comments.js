const { Router } = require('express');
const router = Router();
const comment_controller = require('../controllers/commentController');

//Comment routes
////GET all comments
router.get('/', comment_controller.comments_getAll);

////POST comment
router.post('/', comment_controller.comments_post);

////GET single comment
router.post('/', comment_controller.comments_getOne);

////PUT comment
router.put('/:commentid', comment_controller.comments_modify);

////DELETE comment
router.delete('/:commentid', comment_controller.comments_delete);

module.exports = router;