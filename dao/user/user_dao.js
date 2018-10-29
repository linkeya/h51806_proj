const {
	User
} = require("../model/model.js");

const UserDao = {
	//保存用户数据
	save(userinfo) {
		const user = new User(userinfo);
		return user.save();
	},
	//查找用户数据
	find(condition) {
		return User.find(condition);
	}
}

module.exports = UserDao;