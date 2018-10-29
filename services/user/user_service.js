//引入"UserDao"依赖
const UserDao = require("../../dao/user/user_dao.js");

//用户"业务逻辑层处理"
const UserService = {
	//登录
	login(req, res, next) {
		console.log("我在登录");
		//post方式获取数据
		const {
			username,
			password
		} = req.body;
		//数据访问：根据用户名查找用户信息
		UserDao.find({
				username
			})
			.then((data) => {
				if(data.length === 1) { //存在与查找用户名相关的对象
					if(password === data[0].password) { //密码一致
						res.json({
							res_code: 1,
							res_error: "",
							res_body: {
								status: 1,
								message: "success",
								data: {
									username: data[0].username
								}
							}
						});
					} else {
						res.json({
							res_code: 1,
							res_error: "",
							res_body: {
								status: 0,
								message: "密码错误",
								data: {}
							}
						});
					}
				} else {
					res.json({
						res_code: 1,
						res_error: "",
						res_body: {
							status: 0,
							message: "用户名不存在",

							data: {}
						}
					});
				}
			})
			.catch((err) => {
				res.json({
					res_code: 0,
					res_error: err,
					res_body: {}
				});
			});

	},

	//注册
	register(req, res, next) {
		const {
			username,
			password,
			email
		} = req.body;

		//用户密码加密处理
		//TODO

		//将用户注册信息发送到数据访问层处理
		UserDao.save({
				username,
				password,
				email
			})
			.then((data) => {
				console.log(data);
				res.json({
					res_code: 1,
					res_error: "",
					res_body: {
						status: 0,
						message: "success",
						data: {
							username: data.username
						}
					}
				});
			})
			.catch((err) => {
				console.log(err);
				res.json({
					res_code: 1,
					res_error: "",
					res_body: {
						status: 0,
						message: "failed:" + err,
						data: {}
					}
				});
			});
	},
	//检测用户名是否已存在
	check(req, res, next) {

	},

	//注销
	logout(req, res, next) {

	}

}

module.exports = UserService;