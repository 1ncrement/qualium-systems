/**
 * Created by user on 30.08.2016.
 */
var
	UsersSchem = require('../mongoose/models/UsersSchem'),
	statusError = require('status-errors');

module.exports = (req, res, next)=>{
	if(req.headers.authorization == 'null'){
		res.json({err: 401, message:"You must be logged"});
		return;
	}

	UsersSchem.findOne({token: req.headers.authorization})
		.then((res)=>{
			next();
		})
		.catch((err)=>{console.error(err); res.json({err: 401, message:"You must be logged"})});
};