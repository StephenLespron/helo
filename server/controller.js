const bcrypt = require('bcrypt');

module.exports = {
	register: async (req, res) => {
		const db = req.app.get('db'),
			{ username, password } = req.body;

		const existingAccount = await db.check_account(username);

		//checking if user already exists
		if (existingAccount[0]) {
			return res.status(409).send('User already exists');
		}

		//create new account
		const salt = bcrypt.genSaltSync(10),
			hash = bcrypt.hashSync(password, salt),
			newAccount = await db.register([username, hash]);

		req.session.account = {
			accountId: newAccount[0].id,
			username: newAccount[0].username,
			profilePic: newAccount[0].profile_pic,
		};

		res.status(200).send(newAccount);
	},
	login: async (req, res) => {
		const db = req.app.get('db'),
			{ username, password } = req.body;

		const account = await db.check_account(username);

		if (!account[0]) {
			return res.status(404).send('User does not exist');
		} else {
			const authenticated = bcrypt.compareSync(password, account[0].password);
			if (authenticated) {
				req.session.account = {
					accountId: account[0].id,
					username: account[0].username,
					profilePic: account[0].profile_pic,
				};
				res.status(200).send(account);
			} else {
				res.status(403).send('Password incorrect');
			}
		}
	},
	logout: async (req, res) => {
		req.session.destroy();
		res.sendStatus(200);
	},
	getAccount: async (req, res) => {
		if (req.session.account) {
			res.status(200).send(req.session.account);
		} else {
			res.sendStatus(404);
		}
	},
	getPosts: (req, res) => {
		const db = req.app.get('db'),
			{ accountId } = req.session.account,
			{ includeMyPosts, search } = req.query;

		const criteria = `%${search}%`;

		if (includeMyPosts) {
			db.get_posts([0, criteria.toLowerCase()])
				.then((posts) => res.status(200).send(posts))
				.catch((err) => res.status(500).send(console.log(err)));
		} else {
			db.get_posts([accountId, criteria.toLowerCase()])
				.then((posts) => res.status(200).send(posts))
				.catch((err) => res.status(500).send(console.log(err)));
		}
	},
	getPost: (req, res) => {
		const db = req.app.get('db'),
			{ postId } = req.params,
			{ accountId } = req.session.account;

		db.get_post(postId)
			.then((post) => {
				post[0].accountId = +accountId;
				// const details = [...post, accountId];
				res.status(200).send(post);
			})
			.catch((err) => res.status(500).send(console.log(err)));
	},
	newPost: (req, res) => {
		const db = req.app.get('db'),
			{ title, img, content } = req.body,
			{ accountId } = req.session.account;

		db.create_post([title, img, content, +accountId])
			.then(() => res.sendStatus(200))
			.catch((err) => res.status(418).send(console.log(err)));
	},
	deletePost: (req, res) => {
		const db = req.app.get('db'),
			{ postId } = req.params;

		db.delete_post([+postId])
			.then(() => console.log(postId, +postId))
			.catch((err) => console.log(err, postId, +postId));
	},
};
