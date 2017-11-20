const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const grid = require('gridfs-stream');
const fs = require('fs');
const requireLogin = require('../middlewares/requireLogin');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const multer = require('multer');

const Survey = mongoose.model('surveys');

const storage = multer.diskStorage({
  destination: './files',
  filename(req, file, cb) {
    cb(null, `${new Date()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

module.exports = app => {

	app.get('/api/surveys', requireLogin, async (req, res) => {
		const surveys = await Survey.find({ _user: req.user.id });

		res.send(surveys);
	});

	app.get('/api/surveys/:surveyId/:choice', (req, res) =>{
		res.send('Thanks for voting! Wow!');
	});

	app.get('/api/surveys/all', requireLogin, async (req, res) => {
		const allSurveys = await Survey.find({});

		res.send(allSurveys);
	});

	app.get('/api/surveys/:surveyId/:choice', (req, res) =>{
		res.send('Thanks for voting! Wow!');
	});


	app.post('/api/surveys/', requireLogin, async (req, res) => {
		
		const { title, subject, responsibleDept, body } = req.body;
		
		const survey = new Survey({
			title,
			subject,
			responsibleDept,
			body,
			_user: req.user.id,
			dateSent: Date.now()
		});
	
		const mailer = new Mailer(survey, surveyTemplate(survey));

		try {
			await mailer.send();
			await survey.save();
			const user = await req.user.save();

			res.send(user);
		} catch(err) {
			res.status(422).send(err);
		}
	});

	app.post('/api/fileupload/', requireLogin, upload.single('data'), async (req, res) => {
		
		const file = req.data;
		const meta = req.body;
		console.log(file);
		const imgPath = "files/"+ meta.name;

		const uploadingFile = new Survey;
		uploadingFile.uploadedFile.data = fs.readFileSync(imgPath);
		uploadingFile.uploadedFile.contentType = meta.type;
		uploadingFile.save();

	});
};