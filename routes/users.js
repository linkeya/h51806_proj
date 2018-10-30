var express = require('express');
var router = express.Router();
var UserService = require("../services/user/user_service.js");

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

// 登录：完整路径 "/api/users/login"
router.post("/login", UserService.login);

// 注册：完整路径 "/api/users/register"
router.post("/register", UserService.register);

// 注销
router.get("/logout", UserService.logout);

module.exports = router;