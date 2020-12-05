var express = require('express');
var router = express.Router();
var fs = require('fs');

/* POST users listing. */
router.use('/', function(req, res, next) {
  fs.readFile('mydata.txt',function(err,data){
    res.send('讀檔結果:'+data);
  });
});

module.exports = router;
