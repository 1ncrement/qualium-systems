/**
 * Created by user on 30.08.2016.
 */
var userCtrl = {},
	UsersSchem = require('../mongoose/models/UsersSchem'),
	statusError = require('status-errors'),
	bcrypt = require('bcryptjs'),
	jwt = require('jsonwebtoken'),
	expressJWT = require('express-jwt'),
	express = require('express'),
	app = express();

var SECRET = 'sectersometoken';

app.use(expressJWT({secret: SECRET}));

userCtrl.postUser = (req, res, next) => {
	var salt = bcrypt.genSaltSync(10),
		b = req.body,
		hash = bcrypt.hashSync(b.password, salt);

	var user = new UsersSchem({
		firstName: b.firstName,
		lastName: b.lastName,
		email: b.email,
		password: hash
	});

	user.save()
		.then((user)=>{res.json(user)})
		.catch((err)=>{console.error(err); next(err)});
};

userCtrl.login = (req, res, next) => {
	UsersSchem.findOne({email: req.body.email})
		.then((user)=>{
			if(!user){
				console.log('Login Error, bad email');
				res.end();
				/** @todo обработать ошибку правильно */
			}else{
				if(!bcrypt.compareSync(req.body.password, user.password)){
					console.log('Login Error, bad password');
					res.end();
					/** @todo обработать ошибку правильно */
				}else{
					user.token = jwt.sign(user, SECRET, {expiresIn: 60*60*24});
					var token = user.token;

					user.save((err, result)=>{
						if(err){
							console.log(err);
							return;
						}
						console.log('Save user', result);
					});

					res.json({token});
				}
			}
		})
		.catch((err)=>{console.error(err); next(err)});
};

userCtrl.logout = (req, res, next) => {
	UsersSchem.findOne({token: req.body.authorization})
		.then((user)=>{
			user.token = null;
			user.save();
			res.json({message: 'Logout'})
		})
		.catch((err)=>{console.error(err); next(err)});
};

userCtrl.getUsers = (req, res, next)=>{
	UsersSchem.find({})
		.then((user)=>{res.json(user)})
		.catch((err)=>{console.error(err); next(err)});
};

userCtrl.removeUsers = (req, res, next)=>{
	UsersSchem.remove({})
		.then((user)=>{res.json(user)})
		.catch((err)=>{console.error(err); next(err)});
};

module.exports = userCtrl;