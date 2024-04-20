const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.send('Received a GET HTTP method');
});

router.post('/', (req, res) => {
  res.send('Received a POST HTTP method');
});

router.put('/:commentid', (req, res) => {
  res.send('Received a PUT HTTP method');
});

router.delete('/:commentid', (req, res) => {
  res.send('Received a DELETE HTTP method');
});


module.exports = router;