const keys = require('../../config/keys');

module.exports = survey => {
	return `
		<html>
			<body>
				<img src="http://s19.postimg.org/5cyr1e3oz/new_suggestion.png" alt="You've got a new suggestion" />
				<table rules="all" style="border-color: #666;" cellpadding="10">
					<tr style='background: #eee;'><td><strong>Name:</strong> </td><td>${survey.userName}</td></tr>
					<tr><td><strong>Email:</strong> </td><td>${survey.userEmail}</td></tr>
					<tr><td><strong>Suggestion:</strong></td><td>${survey.body}</td></tr>
					<tr><td><strong>Status: </strong> </td><td>${survey.status}</td></tr>
					<tr><td><strong>Change Status: </strong> </td><td><a href="${keys.redirectDomain}/api/surveys/${survey.id}/pending">Pending</a> <br /> <a href="${keys.redirectDomain}/api/surveys/${survey.id}/closed">Closed</a></td></tr>
				</table>
			</body>
		</html>
	`;
};
