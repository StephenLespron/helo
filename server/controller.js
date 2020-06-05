const bcrypt = require('bcrypt');

module.exports = {
	register: async (req, res) => {
		const db = req.app.get('db'),
			{ username, password, profilePic } = req.body;

		const existingAccount = await db.check_account(username);

		//checking if user already exists
		if (existingAccount[0]) {
			return res.status(409).send('User already exists');
		}

		//create new account
		const salt = bcrypt.genSaltSync(10),
			hash = bcrypt.hashSync(password, salt),
			newAccount = await db.register([username, hash, profilePic]);

		// req.session.user = {
		// 	accountId: newAccount[0].id,
		// 	username: newAccount[0].username,
		// 	profilePic: newAccount[0].profile_pic,
		// };

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
				// req.session.user = {
				// 	accountId: account[0].id,
				// 	username: account[0].username,
				// 	profilePic: account[0].profile_pic,
				// };
				res.status(200).send(account);
			} else {
				res.status(403).send('Password incorrect');
			}
		}
	},
	logout: async (req, res) => {},
	getPosts: async (req, res) => {
		const db = req.app.get('db'),
			{ userId } = req.params,
			{ includeMyPosts, search } = req.query;

		const criteria = `%${search}%`;

		if (includeMyPosts) {
			await db
				.get_posts([0, criteria])
				.then((posts) => res.status(200).send(posts))
				.catch((err) => res.status(500).send(console.log(err)));
		} else {
			await db
				.get_posts([userId, criteria])
				.then((posts) => res.status(200).send(posts))
				.catch((err) => res.status(500).send(console.log(err)));
		}
	},
};
