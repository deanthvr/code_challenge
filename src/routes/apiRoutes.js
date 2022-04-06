const express = require('express');
const router = express.Router();
const controller = require('../controller/parse.controller');

// this is a test route to make sure the server is running from your browser
router.get('/', (req, res, next) => {
  res.send('You have hit GET /api endpoint');
});

router.post('/parse' ,controller.parse);


module.exports = router;