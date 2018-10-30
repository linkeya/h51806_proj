const PositionDao = require("../../dao/position/position_dao.js");

const PositionService = {
	//添加职位
	add(req, res, next) {
		//获取POST请求中传递的数据
		const {
			posName,
			company,
			experience,
			posType,
			workPlace,
			salary
		} = req.body;

		let logo = "";
		if(req.file) {
			console.log(req.file.filename);
			logo = "/images/upload/" + req.file.filename
		}

		//保存到数据库中
		PositionDao.save({
				logo,
				posName,
				company,
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
	},

	//分页查询
	findByPage(req, res, next) {
		//获取查询的页码
		const {
			page
		} = req.query;
		//查询指定页码的数据
		PositionDao.findByPage(page)
			.then((data) => {
				res.json({
					res_code: 1,
					res_error: "",
					res_body: {
						status: 1,
						list: data
					}
				});
			})
			.catch((err) => {
				res.json({
					res_code: 0,
					res_error: err,
					res_body: {}
				})
			});

	},
	/*删除*/
	delete(req, res, next) {
		const {
			id
		} = req.query;
		PositionDao.delete(id)
			.then((data) => {
				res.json({
					res_code: 1,
					res_error: "",
					res_body: {
						status: 1,
						message: "删除成功"
					}
				});
			})
			.catch((err) => {
				res.json({
					res_code: 1,
					res_error: err,
					res_body: {
						status: 0,
						message: "删除失败"
					}
				});
			})
	}
}

module.exports = PositionService;