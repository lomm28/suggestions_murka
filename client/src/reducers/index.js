import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';
import allSurveysReducer from './allSurveysReducer';
import assignedToUserReducer from './assignedToUserReducer';
import addCommentReducer from './addCommentReducer';

export default combineReducers({
	auth: authReducer,
	form: reduxForm,
	surveys: surveysReducer,
	allSurveys: allSurveysReducer,
	assignedToUser: assignedToUserReducer,
	addComment: addCommentReducer
}); 