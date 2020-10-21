const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Justin:Justin123@cluster0.ig55i.mongodb.net/aiWebsite?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const ObjectID = require('mongodb').ObjectID;
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');


const app = express();
app.use(express.json());
app.use(cors());

var collection;


app.listen(8080, () => {
	console.log('connected to database, listening on port 8080');
		});


(async function connectToDatabase	() {
	try {
		await client.connect();

		console.log("Connected successfully to server");
		
		collection = client.db("aiWebsite").collection("Users");
	}

	catch(err) {
		throw Error(err);
	}
})().catch(console.dir);


app.get('/', (req, res) => {
	return res.json("connected");
	})


// @route	POST api/users
// @desc	Check if user exists in db
// @access	Public (May add auth later)
app.post('/signin', (req, res) => { signin.handleSignin(req, res, bcrypt, collection) })


// @route	POST api/users
// @desc	Add user to db
// @access	Public
app.post('/register', (req, res) => { register.handleRegister(req, res, bcrypt, collection) })


// @route	PUT api/image
// @desc	Incrememnt user numImgSubmitted
// @access	Public
app.put('/image', (req, res) => { image.handleImage(req, res, ObjectID, collection) })


app.post('/imageUrl', (req, res) => { image.handleApiReq(req, res) })


// Clean exit
process.on('SIGINT', () => {
    process.exit();
});



















