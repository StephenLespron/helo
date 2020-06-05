require('dotenv').config();
const express = require('express'),
	session = require('express-session'),
	massive = require('massive'),
	ctrl = require('./controller'),
	app = express(),
	{ SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

app.use(express.json());

//Auth Endpoints
app.post('/auth/register', ctrl.register);
app.post('/auth/login', ctrl.login);

massive({
	connectionString: CONNECTION_STRING,
	ssl: { rejectUnauthorized: false },
}).then((db) => {
	app.set('db', db);
	console.log(`DB running`);
	app.listen(SERVER_PORT, () => console.log(`with port: ${SERVER_PORT}`));
});
