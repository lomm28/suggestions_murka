import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS, FETCH_ALL_SURVEYS, FETCH_ASSIGNED_TO_USER } from './types';
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

export const fetchSurveys = () => async dispatch => {
	const res = await axios.get('/api/surveys');

	dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

export const fetchAllSurveys = () => async dispatch => {
	const res = await axios.get('/api/surveys/all');

	dispatch({ type: FETCH_ALL_SURVEYS, payload: res.data });
};

export const fetchAssignedToUser = () => async dispatch => {
	const res = await axios.get('/api/surveys/user');

	dispatch({ type: FETCH_ASSIGNED_TO_USER, payload: res.data });
};