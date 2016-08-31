/**
 * Created by user on 30.08.2016.
 */
var express = require('express'),
	path = require('path'),
	router = express.Router(),
	usersCtrl = require('../controllers/users-ctrl'),
	newsCtrl = require('../controllers/news-ctrl');


/** User req */
/** @todo добавить валидатор где будет метод registration */
router.get('/getusers', usersCtrl.getUsers);
router.get('/removeusers', usersCtrl.removeUsers);

router.post('/postuser', usersCtrl.postUser);
router.post('/login', usersCtrl.login);
router.post('/logout', usersCtrl.logout);

/** News req */
router.post('/getnews', newsCtrl.getNews);
router.post('/addnews', newsCtrl.addNews);

module.exports = router;