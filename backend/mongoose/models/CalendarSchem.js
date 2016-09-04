/**
 * Created by Increment on 04.09.2016.
 */
var mg = require('../index'),
	mongoosePaginate = require('mongoose-paginate'),

	Calendar = new mg.Schema({
		authorId: {type: String},
		date: {type: String},
		time: {type: String},
		text: {type: String},
		tags: {type: Array},
		color: {type: String},

		createdAt: {type: Date, default: Date.now}
	});

Calendar.plugin(mongoosePaginate);

var DB = mg.model('CalendarTasks', Calendar);

module.exports = DB;