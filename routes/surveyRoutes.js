const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const path = require('path');
const mongoose = require('mongoose');
const Survey = mongoose.model('surveys');
const fs = require('fs');
const formidable = require('formidable');
const requireLogin = require('../middlewares/requireLogin');
const dbCtrl = require('./dbCtrl');


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

	app.post('/api/surveys/', requireLogin, async (req, res) => {

		const form = new formidable.IncomingForm()
  			form.uploadDir = path.join(__dirname, '../public/uploads')
  			await form.parse(req, (err, title, file) => {
    			if (err) {
      				res.json(err)
    			}
    		console.log(file['uploadfile[0]'].name);
    		
    		const name = path.basename(file['uploadfile[0]'].path) + file['uploadfile[0]'].name
    		fs.rename(file['uploadfile[0]'].path, path.join(form.uploadDir, name))
    		req.body = { 
    			src: name, 
    			title: title.title,
    			subject: title.subject,
    			responsibleDept: title['responsibleDept[name]'],
    			deptEmail: title['responsibleDept[value]'],
    			body: title.body
    		}
    		dbCtrl.create(req, res);
  		})

	});
};