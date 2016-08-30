/**
 * Created by user on 30.08.2016.
 */
var mg = require('../index'),

	Users = new mg.Schema({
		firstName: {type: String},
		lastName: {type: String},
		email: {type: String, unique: true},
		password: {type: String},

		token: String,
		createdAt: {type: Date, default: Date.now}
	}),

	DB = mg.model('Users', Users);

module.exports = DB;