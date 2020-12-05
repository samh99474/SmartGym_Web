var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('你的輸入'+req.query.username);
});
/* POST users listing. */
router.post('/', function(req, res, next) {
  res.send('你的輸入'+req.body.myname);
});


module.exports = router;
