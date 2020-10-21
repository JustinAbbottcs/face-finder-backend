const Clarifai = require('clarifai')


const app = new Clarifai.App({
 apiKey: '0b38972248d44fecbbf369f8a15b89a9'
});


const handleApiReq = (req, res) => {
	app.models.initModel(
		{
			id: "e15d0f873e66047e579f90cf82c9882z",
			version: "0df9eb6c71674ada9bbec68729aa1c4c"
		})
    	.then(faceModel => { return faceModel.predict(req.body.input) })
    	.then(data => { res.json(data) })
    	.catch(err => res.status(400).json('Unable to connect to API'))
  }


const handleImage = (req, res, ObjectID, collection) => {
	
	const { id } = req.body;

	const filter = { _id: ObjectID(id) };
	
	const updateDoc = {
		$inc: { numImgSubmitted: 1}
	};

	// console.log(filter);
	// console.log(updateDoc);

	collection.findOneAndUpdate(filter, updateDoc, {returnOriginal: false})
		.then(user => {
			// console.log(user.value.numImgSubmitted)
			return user.value.numImgSubmitted
		})
		.then(data => {
			console.log(data)
			res.status(200).json(data)
		})
		.catch(err => res.status(400).json("Record update failed"));
}

module.exports = {
	handleImage,
	handleApiReq
}