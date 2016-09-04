/**
 * Created by Increment on 04.09.2016.
 */
var calendarCtrl = {},
	CalendarSchem = require('../mongoose/models/CalendarSchem'),
	statusError = require('status-errors'),
	bcrypt = require('bcryptjs'),
	jwt = require('jsonwebtoken'),
	expressJWT = require('express-jwt'),
	express = require('express'),
	paginate = require('express-paginate'),
	app = express();

calendarCtrl.addTask = (req, res, next) => {
	var b = req.body,
		task = new CalendarSchem({
			authorId: b.authorId,
			date: b.date,
			time: b.time,
			text: b.text,
			tags: b.tags,
			color: b.color
		});

	task.save()
		.then((data)=>res.json(data))
		.catch((err)=>{console.error(err); next(err)});
};

calendarCtrl.getTask = (req, res, next) => {
	var b = req.body,
		date = b.date;

	CalendarSchem.find({date: date})
		.then((date)=>res.json(date))
		.catch((err)=> {console.error(err);next(err)});
};

module.exports = calendarCtrl;