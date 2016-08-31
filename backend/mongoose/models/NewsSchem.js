/**
 * Created by user on 31.08.2016.
 */
var mg = require('../index'),
	mongoosePaginate = require('mongoose-paginate'),

	News = new mg.Schema({
		author: {type: String},
		title: {type: String},
		text: {type: String},
		tags: {type: Array},

		createdAt: {type: Date, default: Date.now}
	});

	News.plugin(mongoosePaginate);

	var DB = mg.model('News', News);

module.exports = DB;