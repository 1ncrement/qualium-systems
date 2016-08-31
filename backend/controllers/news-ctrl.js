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
	app = express();

var SECRET = 'sectersometoken';

app.use(expressJWT({secret: SECRET}));

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

newsCtrl.getNews = (req, res, next) => {
	var b = req.body;
	var defaultSize = 10;
	b.page = b.page ? b.page*10 : 0;

	NewsSchem.find({})
		.skip(Number(b.page))
		.limit(Number(b.size)||defaultSize)

		.then((news)=>res.json(news))
		.catch((err)=>{console.error(err); next(err)});
};

module.exports = newsCtrl;