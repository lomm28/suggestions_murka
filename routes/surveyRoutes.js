const _ = require('lodash');
//const Path = require('path-parser');
const { URL } = require('url');
const path = require('path');
const mongoose = require('mongoose');
const fs = require('fs');
const formidable = require('formidable');
const requireLogin = require('../middlewares/requireLogin');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const dbCtrl = require('./dbCtrl');

const Survey = mongoose.model('surveys');


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
		
		const { title, subject, responsibleDept, body, uploadfile } = req.body;
		
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
		
		const form = new formidable.IncomingForm()
  		form.uploadDir = path.join(__dirname, '../public/uploads')
  		form.parse(req, (err, title, file) => {
    		if (err) {
      			res.json(err)
    		}
    		const name = path.basename(file.file.path) + file.file.name
    		fs.rename(file.file.path, path.join(form.uploadDir, name))
    		req.body = { src: name, title: title.title }
    		dbCtrl.create(req, res)
  		})

	});
};