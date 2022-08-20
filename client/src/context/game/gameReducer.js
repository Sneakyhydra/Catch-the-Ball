import {
	UPDATE_HIGH_SCORE_SUCCESS,
	UPDATE_HIGH_SCORE_FAIL,
	ADD_RECENT_SCORE_SUCCESS,
	ADD_RECENT_SCORE_FAIL,
	GET_RECENT_SCORE_SUCCESS,
	GET_RECENT_SCORE_FAIL,
} from '../types';

// Change state according to the type of action
const gameReducer = (state, action) => {
	switch (action.type) {
		case GET_RECENT_SCORE_SUCCESS:
			return {
				...state,
				recent: action.payload,
			};

		case UPDATE_HIGH_SCORE_SUCCESS:
		case ADD_RECENT_SCORE_SUCCESS:
			return state;

		case UPDATE_HIGH_SCORE_FAIL:
		case ADD_RECENT_SCORE_FAIL:
		case GET_RECENT_SCORE_FAIL:
			return {
				...state,
				error: action.payload,
			};

		default:
			return state;
	}
};

export default gameReducer;
