var express = require('express');
var router = express.Router();
var fs = require('fs');

/* POST users listing. */
router.post('/', function(req, res, next) {
  fs.writeFile('mydata.txt', req.body.username, function(){
    res.send('你的輸入:'+req.body.username+'已經寫入檔案');
  });
  
});

module.exports = router;
