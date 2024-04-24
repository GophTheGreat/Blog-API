const { Router } = require('express');

const router = Router();

//Comment routes
////GET all comments
router.get('/', (req, res) => {
  res.send('Received a GET HTTP method');
});

////POST comment
router.post('/api/comments', (req, res) => {
  res.send('Received a POST HTTP method');
});

////PUT comment
router.put('/api/comments/:commentid', (req, res) => {
  res.send('Received a PUT HTTP method');
});

////DELETE comment
router.delete('/api/comments/:commentid', (req, res) => {
  res.send('Received a DELETE HTTP method');
});

module.exports = router;