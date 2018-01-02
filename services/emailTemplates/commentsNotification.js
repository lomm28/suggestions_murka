
module.exports = survey => {
	return `
		<html>
			<body>
				<p>${survey.commentByManager} commented on your suggestion:</p>
				<p>${survey.comment}</p>
			</body>
		</html>
	`;
};
