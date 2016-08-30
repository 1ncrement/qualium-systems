/**
 * Created by increment on 23.08.16.
 */
var webpack = require('webpack'),
	webpackDevMiddleware = require('webpack-dev-middleware'),
	webpackHotMiddleware = require('webpack-hot-middleware'),
	config = require('./webpack.config'),
	configServer = require('./config');

var app = new (require('express'))();

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));
app.use(webpackHotMiddleware(compiler));

app.get(['/','/login','/postuser','/logout','/getusers','/removeusers'], (req, res)=>{
	res.sendFile(__dirname+'/index.html');
});

app.get('*', (req, res) => {
	res.sendStatus(404);
});

app.listen(configServer.server.port, ()=> {
	console.info(`Listening on port ${configServer.server.port} http://localhost:${configServer.server.port}/`);
});