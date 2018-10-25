var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

router.get("/position", function(req, res, next) {
	res.redirect('/html/position.html');
});

module.exports = router;