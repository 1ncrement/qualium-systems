/**
 * Created by user on 30.08.2016.
 */
var express = require('express'),
	path = require('path'),
	router = express.Router(),
	usersCtrl = require('../controllers/users-ctrl');


/** GET req */
/** @todo добавить валидатор где будет метод registration */
router.get('/logout', usersCtrl.login);
router.get('/getusers', usersCtrl.getUsers);
router.get('/removeusers', usersCtrl.removeUsers);

/** POST req */
router.post('/postuser', usersCtrl.postUser);
router.post('/login', usersCtrl.login);

module.exports = router;