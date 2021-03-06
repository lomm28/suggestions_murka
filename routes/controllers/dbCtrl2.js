const mongoose = require('mongoose');
const Survey = mongoose.model('surveys');
const path = require('path');
const PATH_IMG = path.join(__dirname, '../../public/uploads');
const Mailer = require('../../services/MailerNoAttachment');
const surveyTemplate = require('../../services/emailTemplates/surveyTemplate');

module.exports = {
    create: async (req, res) => {
        
        const { title, body, subject, responsibleDept, deptEmail } = req.body;
      
        const survey = new Survey({
          title,
          body,
          subject,
          responsibleDept,
          deptEmail,
          _user: req.user.id,
          userEmail: req.user.email[0].value,
          userName: req.user.fullName,
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
    }
};