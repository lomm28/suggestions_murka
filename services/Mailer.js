const sendgrid = require("sendgrid");
const helper = sendgrid.mail;
const keys = require("../config/keys");
const fs = require("fs");

class Mailer extends helper.Mail {
	constructor({ subject, responsibleDept, uploadfile }, content) {
		super();

		this.sgApi = sendgrid(keys.sendGridKey);
		this.from_email = new helper.Email("no-reply@suggestia.com");
		this.subject = subject;
		this.body = new helper.Content("text/html", content);
		this.recipient = new helper.Email(responsibleDept.value);

		this.mail = new helper.Mail(this.from_email, this.subject, this.recipient, this.body);


		this.attachment = new helper.Attachment();
		this.file = fs.readFileSync(uploadfile[0].name);
		this.base64File = new Buffer(this.file).toString("base64");
		this.attachment.setType(uploadfile[0].type);
    	this.attachment.setFilename(uploadfile[0].name);
    	this.attachment.setDisposition("attachment");
    	this.attachment.setContent(this.base64File);

    	this.mail.addAttachment(this.attachment);

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