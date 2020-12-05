var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('received data='+req.query.mydata);
});

/* POST users listing. */
router.post('/', function(req, res, next) {
  res.send('received data='+req.body.mydata);
});

module.exports = router;
