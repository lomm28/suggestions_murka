
module.exports = survey => {
	return `
		<html>
			<body>
				<p>Status of your inquiry was changed to ${survey.status}</p>
				<p>Please stay patient. You will get updates notification shortly</p>
			</body>
		</html>
	`;
};
