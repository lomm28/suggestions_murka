const sendgrid = require("sendgrid");
const helper = sendgrid.mail;
const keys = require("../config/keys");
const fs = require("fs");
const path = require("path");

class Mailer extends helper.Mail {
	constructor({ subject, deptEmail }, content) {
		super();

		this.sgApi = sendgrid(keys.sendGridKey);
		this.from_email = new helper.Email("no-reply@suggestia.com");
		this.subject = subject;
		this.body = new helper.Content("text/html", content);
		this.recipient = new helper.Email(deptEmail);

		this.mail = new helper.Mail(this.from_email, this.subject, this.recipient, this.body);

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