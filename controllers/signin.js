const handleSignin = (req, res, bcrypt, collection) => {
	const {email, password} = req.body;

	if (!email || !password) {
		return res.status(400).json('Invalid form submission');
	}

	const validateUser = async (email, pass) => {
		try {
			const user = await collection.findOne({email: email});
			const validated = await bcrypt.compare(pass, user.password);

			if (validated) return user;
		 	else return null;

		} catch {
			(err => {
				console.error(err);
				res.json('unable to find user');
			});
		}
	}


	validateUser(email, password)
	.then(user => {
		delete user['password'];
		user ? res.json(user) : res.json("invalid credentials");
	})
	.catch(err => res.status(400).json('unable to validate user'));
}

module.exports = {
	handleSignin: handleSignin
}