require('dotenv').config();
const express = require('express'),
	session = require('express-session'),
	massive = require('massive'),
	ctrl = require('./controller'),
	app = express(),
	{ SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

app.use(express.static(`${__dirname}/../build`));

app.use(express.json());

app.use(
	session({
		resave: false,
		saveUninitialized: true,
		cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
		secret: SESSION_SECRET,
	})
);

//Auth Endpoints
app.post('/auth/register', ctrl.register);
app.post('/auth/login', ctrl.login);
app.get('/auth/me', ctrl.getAccount);
app.post('/auth/logout', ctrl.logout);

//Posts Endpoints
app.get('/api/posts/', ctrl.getPosts);
app.get('/api/post/:postId', ctrl.getPost);
app.post('/api/post/', ctrl.newPost);
app.delete('/api/post/:postId', ctrl.deletePost);

massive({
	connectionString: CONNECTION_STRING,
	ssl: { rejectUnauthorized: false },
}).then((db) => {
	app.set('db', db);
	console.log(`DB running`);
	app.listen(SERVER_PORT, () => console.log(`with port: ${SERVER_PORT}`));
});
