var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express x4.0' });
});
router.all('/login', notAuthentication).get('/login', function(req, res, next) {
  res.render('login', { title: '用户登陆' });
}).post('/login',function(req, res, next){
	var user={
		username:'admin',
		password:'admin'
	}
	if(req.body.username==user.username&&req.body.password==user.password){
    req.session.user = user;
    res.redirect('/home')
	}else{
    req.session.error='用户名或密码不正确！'
    res.redirect('/login')
  }
});
router.get('/logout',authentication)
      .get('/logout',function(req,res,next){
        req.session.user=null;
        res.redirect('/')
      });
router.get('/home',authentication).get('/home',function(req,res,next){
  res.render('home',{title:'Home'})
});
function authentication(req, res, next) {
if (!req.session.user) {
req.session.error='请先登陆';
return res.redirect('/login');
}
next();
}
function notAuthentication(req, res, next) {
if (req.session.user) {
req.session.error='已登陆';
return res.redirect('/home');
}
next();
}
module.exports = router;
