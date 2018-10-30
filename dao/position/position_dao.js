const {
	Position
} = require("../model/model.js");

const PositionDao = {
	//保存职位数据
	save(positionInfo) {
		const position = new Position(positionInfo);
		return position.save();
	},

	//分页查询
	findByPage(page) {
		const pageSize = 3; //默认显示5条数据
		return Position.find({}).limit(pageSize).skip((page - 1) * pageSize); //加{}和不加任何参数，都表示查询出所有满足条件的记录，与where相似
	},

	//删除
	delete(id) {
		const position = Position.find({
			id
		}, (err) => {
			if(err) {
				console.log("failed");
			} else {
				console.log("success")
			}
		});
		console.log(position)
		return Position.deleteOne(position);
	}
}

module.exports = PositionDao;