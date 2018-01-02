const sendgrid = require("sendgrid");
const helper = sendgrid.mail;
const keys = require("../config/keys");
const fs = require("fs");
const path = require("path");

class Mailer extends helper.Mail {
	constructor({ subject, deptEmail, type, src }, content) {
		super();

		this.sgApi = sendgrid(keys.sendGridKey);
		this.from_email = new helper.Email("no-reply@suggestia.com");
		this.subject = subject;
		this.body = new helper.Content("text/html", content);
		this.recipient = new helper.Email(deptEmail);

		this.mail = new helper.Mail(this.from_email, this.subject, this.recipient, this.body);

			const attachment = new helper.Attachment();
			const file = fs.readFileSync(path.join(__dirname, '../public/uploads', src));
			const base64File = new Buffer(file).toString("base64");
			attachment.setContent(base64File);
			attachment.setType(type);
			attachment.setFilename(src);
			attachment.setDisposition("attachment");
			this.mail.addAttachment(attachment);

			this.addClickTracking();

	}

	addClickTracking() {
		const trackingSettings = new helper.TrackingSettings();
		const clickTracking = new helper.ClickTracking(true, true);

		trackingSettings.setClickTracking(clickTracking);
		this.addTrackingSettings(trackingSettings);
	}

	async send() {
		const request = this.sgApi.emptyRequest({
			method: 'POST',
			path: '/v3/mail/send',
			body: this.mail.toJSON()
		});

		const response = await this.sgApi.API(request);
		return response;
	}
}

module.exports = Mailer;