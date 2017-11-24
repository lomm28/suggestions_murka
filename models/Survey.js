const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
	title: String,
	body: String,
	subject: String,
	responsibleDept: Object,
	img: { type: Schema.Types.ObjectId, ref: 'ImgFile' },
	_user: { type: Schema.Types.ObjectId, ref: 'User' },
	dateSent: Date,
	lastResponded: Date
});

mongoose.model('surveys', surveySchema);