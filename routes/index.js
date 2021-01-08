var express = require('express');
var router = express.Router();
email = "jonathan1446171@gmail.com"

/* GET home page. */
router.get('/:fun', function(req, res, next) {
  console.log(req.cookies.login);
  console.log(req.params.fun)

  if(req.cookies.login == email){
		switch(req.params.fun){
      case "admin_sidebar_Machine":
        return res.render('admin_sidebar_Machine', { title: 'SAMH' });
    }
	}else{
		return res.redirect('/server_firebase/login.html')
	}
});

module.exports = router;
