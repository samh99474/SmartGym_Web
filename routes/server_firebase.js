var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/login.html', function(req, res, next) {
  //res.send('Wiki home page');
  return res.redirect('/login.html');
});

/* POST users listing. */
router.post('/', function(req, res, next) {
   console.log(req.body)
  //console.log(req.body.IdToken)
  //console.log(req.body.Email)
  //console.log(res)
  res.cookie("login",req.body.email)
  return res.redirect('/admin_sidebar_Machine')
});

module.exports = router;