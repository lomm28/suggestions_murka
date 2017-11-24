export default (values) => {

	const data = new FormData();

	for (let key in values) {
		data.append('key', values[key]);
	};
		
	return data;

};