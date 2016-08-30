/**
 * Created by increment on 23.08.16.
 */
var route = require('./routes'),
	bodyParser = require('body-parser'),
	configServer = require('./config');

var app = new (require('express'))();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(route);

app.use((err, req, res, next) => {
	res.status(err.status || 500).json({
		error: {
			status: err.status,
			message: err.message
		}
	});
});

app.listen(configServer.server.port, ()=> {
	console.info(`Listening on port ${configServer.server.port} http://localhost:${configServer.server.port}/`);
});