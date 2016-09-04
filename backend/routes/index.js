/**
 * Created by user on 30.08.2016.
 */
var express = require('express'),
	path = require('path'),
	router = express.Router(),
	usersCtrl = require('../controllers/users-ctrl'),
	newsCtrl = require('../controllers/news-ctrl'),
	calendarCtrl = require('../controllers/calendar-ctrl'),
	checkToken = require('../middleware/checkToken');


/** User req */
/** @todo добавить валидатор где будет метод registration */
router.get('/getusers', usersCtrl.getUsers);
router.get('/removeusers', usersCtrl.removeUsers);

router.post('/postuser', usersCtrl.postUser);
router.post('/login', usersCtrl.login);
router.post('/logout', usersCtrl.logout);

/** News req */
router.get('/getnews', newsCtrl.getNews);
router.post('/addnews', checkToken, newsCtrl.addNews);
router.post('/removenews', checkToken, newsCtrl.removeNews);
router.post('/editnews', checkToken, newsCtrl.editNews);

/** Calendar req*/
router.post('/calendar/add', calendarCtrl.addTask);
router.post('/calendar/get', calendarCtrl.getTask);

module.exports = router;