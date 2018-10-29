const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/h51806', {
	useNewUrlParser: true
});

const userSchema = new mongoose.Schema({
	username: String,
	password: String,
	email: String,
	regTime: Date
});

const positionSchema = new mongoose.Schema({
	logo: String,
	posName: String,
	company: String,
	experience: String,
	posType: String,
	workPlace: String,
	salary: Number
});

const User = mongoose.model('user', userSchema);

const Position = mongoose.model('position', positionSchema);

module.exports = {
	User,
	Position
};