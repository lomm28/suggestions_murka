const _ = require("lodash");
const Path = require("path-parser");
const { URL } = require("url");
const path = require("path");
const mongoose = require("mongoose");
const Survey = mongoose.model("surveys");
const fs = require("fs");
const formidable = require("formidable");
const requireLogin = require("../middlewares/requireLogin");
const dbCtrl = require("./controllers/dbCtrl");
const dbCtrl2 = require("./controllers/dbCtrl2");
const Mailer = require("../services/StatusMailer");
const statusChangeNotification = require("../services/emailTemplates/statusChangeNotification");
const commentsNotification = require("../services/emailTemplates/commentsNotification");

module.exports = app => {
	app.get("/api/surveys", requireLogin, async (req, res) => {
		const surveys = await Survey.find({ _user: req.user.id });

		res.send(surveys);
	});

	app.get("/api/surveys/:surveyId/:status", async (req, res) => {
		res.send("Status of the suggestion was changed");
	});

	app.post('/api/surveys/webhooks', async (req, res) => {

		const url = req.body[0].url;

		const p = new Path('/api/surveys/:surveyId/:status');

		const match = p.test(new URL(url).pathname);
				
		if (match) {
				
			await Survey.updateOne({
				_id: match.surveyId
			}, {
				$set: { 'status': [match.status] }
			}).exec();

			const suggestion = await Survey.find({ _id : match.surveyId });
				
			const mailer = new Mailer(suggestion[0], statusChangeNotification(suggestion[0]));

			await mailer.send();
			res.end();
		}
	})

	app.get("/api/surveys/all", requireLogin, async (req, res) => {
		const allSurveys = await Survey.find({});

		res.send(allSurveys);
	});

	app.get("/api/surveys/user", requireLogin, async (req, res) => {
		
		const userSpecific = await Survey.find({ deptEmail : req.user.email[0].value });

		res.send(userSpecific);
	});

	app.post('/api/adding_comment', async (req, res) => {

		await Survey.updateOne({
			_id: req.body.id
				}, {
				$set: { 'comment': [req.body.comment], 'commentByManager': [req.user.fullName] }
		}).exec();

		const addCommentToSurvey = await Survey.find({ _id : req.body.id });

		const mailer = new Mailer(addCommentToSurvey[0], commentsNotification(addCommentToSurvey[0]));

		await mailer.send();
		res.send({addCommentToSurvey});
	});

	app.post("/api/surveys/", requireLogin, async (req, res) => {
		const form = new formidable.IncomingForm();
		form.uploadDir = path.join(__dirname, "../public/uploads");
		await form.parse(req, (err, title, file) => {
			if (err) {
				res.json(err);
			}

			if (file["uploadfile[0]"]) {
				const name =
					path.basename(file["uploadfile[0]"].path) +
					file["uploadfile[0]"].name;
				fs.rename(
					file["uploadfile[0]"].path,
					path.join(form.uploadDir, name)
				);
				req.body = {
					src: name,
					type: file["uploadfile[0]"].type,
					title: title.title,
					subject: title.subject,
					responsibleDept: title["responsibleDept[name]"],
					deptEmail: title["responsibleDept[value]"],
					body: title.body
				};
				dbCtrl.create(req, res);
			} else {
				req.body = {
					title: title.title,
					subject: title.subject,
					responsibleDept: title["responsibleDept[name]"],
					deptEmail: title["responsibleDept[value]"],
					body: title.body
				};
				dbCtrl2.create(req, res);
			}
		});
	});
};