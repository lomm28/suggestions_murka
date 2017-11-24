const mongoose = require('mongoose');
const { Schema } = mongoose;

const imgSchema = new Schema({
	src: String,
	title: String
});

mongoose.model('images', imgSchema);