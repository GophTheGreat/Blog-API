var express = require('express');
const router = express.Router();
const post_controller = require('../controllers/postController')

//Post routes
////GET all posts
router.get('/', post_controller.posts_getAll);

////POST post for creating a new post
router.post('/', post_controller.posts_post);

////GET individual post
router.get('/:postid', post_controller.posts_getOne)

////PUT post
router.put('/:postid', (req, res) => {
  res.send('Received a PUT HTTP method');
});

////DELETE post
router.delete('/:postid', (req, res) => {
  res.send('Received a DELETE HTTP method');
});

module.exports = router;