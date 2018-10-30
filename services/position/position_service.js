const PositionDao = require("../../dao/position/position_dao.js");

const PositionService = {
	//添加职位
	add(req, res, next) {
		//获取POST请求中传递的数据
		const {
			posName,
			experience,
			posType,
			workPlace,
			salary
		} = req.body;
		//保存到数据库中
		PositionDao.save({
				posName,
				experience,
				posType,
				workPlace,
				salary
			})
			.then((data) => {
				res.json({
					res_code: 1,
					res_error: "",
					res_body: {
						status: 1,
						data: data
					}
				});
			})
			.catch((err) => {
				res.json({
					res_code: 0,
					res_error: err,
					res_body: {}
				});
			})
	}
}

module.exports = PositionService;