import { FETCH_ASSIGNED_TO_USER } from '../actions/types';

export default function (state = [], action) {
	switch(action.type) {
		case FETCH_ASSIGNED_TO_USER:
			return action.payload; 
		default:
			return state;
	}
}