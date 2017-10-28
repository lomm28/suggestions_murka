const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	googleId: String,
	fullName: String,
	email: Object
});

mongoose.model('users', userSchema);