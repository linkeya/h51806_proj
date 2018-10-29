var express = require('express');
var router = express.Router();
var path = require("path");
const PositionService = require("../services/position/position_service.js");

//引入上传文件的multer
const multer = require("multer");
//配置：服务器的磁盘中保存
var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, path.join(__dirname, "../public/images/upload/"));
	},
	filename: function(req, file, cb) {
		//文件后缀
		const ext = file.originalname.slice(file.originalname.lastIndexOf("."));
		cb(null, file.filename + '-' + Date.now() + ext);
	}
});

//添加职位
//完整路径:"/api/positions/add"
var upload = multer({
	storage: storage
});

router.post("/add", upload.single("logo"), PositionService.add);

module.exports = router;