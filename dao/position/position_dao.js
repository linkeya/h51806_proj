const {
	Position
} = require("../model/model.js");

const PositionDao = {
	//保存职位数据
	save(positionInfo) {
		const position = new Position(positionInfo);
		return position.save();
	}
}

module.exports = PositionDao;