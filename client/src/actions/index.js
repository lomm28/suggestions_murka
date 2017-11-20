import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS, UPLOAD_FILE } from './types';

export const fetchUser = () => async dispatch => {
	const res = await axios.get('/api/current_user');
	
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async dispatch => {
	const res = await axios.post('/api/surveys', values);

	history.push('/surveys');

	dispatch({ type: FETCH_USER, payload: res.data });
};

export const uploadFile = ({ uploadfile, name, preview, type, size }) => async dispatch => {
	  let data = new FormData();
	  	data.append('uploadfile', document);
	  	data.append('name', name);
  		data.append('preview', preview);
  		data.append('type', type);
  		data.append('size', size);

	const res = await axios.post('/api/fileupload', data);

	dispatch({ type: UPLOAD_FILE, payload: res.data });
};

export const fetchSurveys = () => async dispatch => {
	const res = await axios.get('/api/surveys');

	dispatch({ type: FETCH_SURVEYS, payload: res.data });
};