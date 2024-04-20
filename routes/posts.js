var express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Received a GET HTTP method');
});

router.post('/', (req, res) => {
  res.send('Received a POST HTTP method');
});

router.put('/:postid', (req, res) => {
  res.send('Received a PUT HTTP method');
});

router.delete('/:postid', (req, res) => {
  res.send('Received a DELETE HTTP method');
});

module.exports = router;