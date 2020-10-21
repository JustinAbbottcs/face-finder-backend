const handleRegister = (req, res, bcrypt, collection) => {
	const {email, username, password} = req.body;

	if (!email || !username || !password) {
		return res.status(400).json('Invalid form submission');
	}

	bcrypt.hash(password, 10, function(err, hash) {

		collection.insertOne({
		name: username,
		email: email,
		password: hash,
		numImgSubmitted: 0,
		joined: new Date()
		})
		.then(user => {
			console.log(
				`${user.insertedCount} documents were inserted with the _id: ${user.insertedId}`)

			delete user.ops[0]['password'];

			res.status(200).json(user.ops[0]);
		})
		.catch(err => res.status(400).json('unable to register'))
	})
}

module.exports = {
	handleRegister: handleRegister
}