const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipientSchema = new Schema({
	name: String,
	value: String
});

module.exports = recipientSchema;