var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/login', function(req, res, next) {
  //res.send('Wiki home page');
  return res.redirect('/login.html');
});

/* POST users listing. */
router.post('/', function(req, res, next) {
   console.log(req.body)
  //console.log(req.body.IdToken)
  //console.log(req.body.Email)
  //console.log(res)
  res.cookie("login",req.body.email)    //cookie 紀錄 key & value
  return res.redirect('/admin_sidebar_manageUser')  //redirect切換到路徑檔案
});

module.exports = router;