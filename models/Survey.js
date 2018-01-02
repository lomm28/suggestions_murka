const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
	title: String,
	body: String,
	subject: String,
	responsibleDept: String,
	deptEmail: String,
	src: String,
	type: String,
	_user: { type: Schema.Types.ObjectId, ref: 'User' },
	status: { type: String, default: 'Submitted' },
	comment: String,
	commentByManager: String,
	userEmail: String,
	userName: String,
	dateSent: Date,
	lastResponded: Date
});

mongoose.model('surveys', surveySchema);