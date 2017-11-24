import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';
import objectToFormData from "object-to-formdata";

export const fetchUser = () => async dispatch => {
	const res = await axios.get('/api/current_user');
	
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async dispatch => {
	const formData = objectToFormData(values);
	const res = await axios.post('/api/surveys', formData);

	history.push('/surveys');

	dispatch({ type: FETCH_USER, payload: res.data });
};

/*export const uploadFile = ({ uploadfile }) => async dispatch => {
	  let data = new FormData();
	  	data.append('uploadfile', uploadfile);

	const res = await axios.post('/api/surveys', data);

	dispatch({ type: UPLOAD_FILE, payload: res.data });
};*/

export const fetchSurveys = () => async dispatch => {
	const res = await axios.get('/api/surveys');

	dispatch({ type: FETCH_SURVEYS, payload: res.data });
};