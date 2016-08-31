/**
 * Created by user on 31.08.2016.
 */
var mg = require('../index'),

	News = new mg.Schema({
		author: {type: String},
		title: {type: String},
		text: {type: String},
		tags: {type: Array},

		createdAt: {type: Date, default: Date.now}
	}),

	DB = mg.model('News', News);

module.exports = DB;