/**
 * Created by user on 30.08.2016.
 */
var newsCtrl = {},
	NewsSchem = require('../mongoose/models/NewsSchem'),
	statusError = require('status-errors'),
	bcrypt = require('bcryptjs'),
	jwt = require('jsonwebtoken'),
	expressJWT = require('express-jwt'),
	express = require('express'),
	paginate = require('express-paginate'),
	app = express();

var SECRET = 'sectersometoken';

app.use(expressJWT({secret: SECRET}));
app.use(paginate.middleware(5,30));

newsCtrl.addNews = (req, res, next) => {
	var b = req.body,
		news = new NewsSchem({
			author: b.author,
			title: b.title,
			text: b.text,
			tags: b.tags
		});

	news.save()
		.then((data)=>res.json(data))
		.catch((err)=>{console.error(err); next(err)});
};

newsCtrl.removeNews = (req, res, next) => {
	var b = req.body;

	NewsSchem.remove({"_id": b._id})
		.then((data)=>res.json(data))
		.catch((err)=>{console.error(err); next(err)});
};

newsCtrl.getNews = (req, res, next) => {
	var props = {
		page: req.query.page ? Number(req.query.page) : 1,
		limit: 10
	};

	NewsSchem.paginate({}, props, (err, news, pageCount, itemCount)=>{
		if (err) return next(err);
		return news;
	})
		.then((data)=>{
			res.json(data);
		})
		.catch((err)=>{console.error(err); next(err)});
};

module.exports = newsCtrl;