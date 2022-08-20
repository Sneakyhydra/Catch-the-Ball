// Imports
import { useReducer } from 'react';
import GameContext from './gameContext';
import gameReducer from './gameReducer';
import {
	UPDATE_HIGH_SCORE_SUCCESS,
	UPDATE_HIGH_SCORE_FAIL,
	ADD_RECENT_SCORE_SUCCESS,
	ADD_RECENT_SCORE_FAIL,
	GET_RECENT_SCORE_SUCCESS,
	GET_RECENT_SCORE_FAIL,
	INCREASE_SCORE,
	RESET_SCORE,
} from '../types';
import axios from 'axios';

axios.defaults.withCredentials = true;

const GameState = (props) => {
	// Set initial state
	const initialState = {
		recent: null,
		error: null,
		score: 0,
	};

	// Init Reducer
	const [state, dispatch] = useReducer(gameReducer, initialState);

	// Get Recent Scores
	const getRecentScores = async () => {
		try {
			// Make a get request at localhost:5000/api/auth
			const res = await axios.get('/api/game/recent');

			// Dispatch the action to reducer for USER_LOADED
			dispatch({ type: GET_RECENT_SCORE_SUCCESS, payload: res.data });
		} catch (err) {
			// Dispatch the action to reducer for AUTH_ERROR
			dispatch({ type: GET_RECENT_SCORE_FAIL, payload: err.response.data.msg });
		}
	};

	// Update High Score
	const updateHighScore = async (formData) => {
		// Set header of the input data
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			// Make a post request at localhost:5000/api/users/student
			await axios.post('api/users/score', formData, config);

			// Dispatch the action to reducer for REGISTER_SUCCESS
			dispatch({
				type: UPDATE_HIGH_SCORE_SUCCESS,
			});
		} catch (err) {
			// Dispatch the action to reducer for REGISTER_FAIL
			dispatch({
				type: UPDATE_HIGH_SCORE_FAIL,
				payload: err.response.data.msg,
			});
		}
	};

	// Add Recent Score
	const addRecentScore = async (formData) => {
		// Set header of the input data
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			// Make a post request at localhost:5000/api/auth
			await axios.post('api/game/recent', formData, config);

			// Dispatch the action to reducer for LOGIN_SUCCESS
			dispatch({
				type: ADD_RECENT_SCORE_SUCCESS,
			});
		} catch (err) {
			// Dispatch the action to reducer for LOGIN_FAIL
			dispatch({
				type: ADD_RECENT_SCORE_FAIL,
				payload: err.response.data.msg,
			});
		}
	};

	const increaseScore = () => {
		dispatch({
			type: INCREASE_SCORE,
		});
	};

	const resetScore = () => {
		dispatch({
			type: RESET_SCORE,
		});
	};

	return (
		<GameContext.Provider
			// Provide these values to all components wrapped in AuthContext in App.js
			value={{
				recent: state.recent,
				error: state.error,
				score: state.score,
				getRecentScores,
				updateHighScore,
				addRecentScore,
				increaseScore,
				resetScore,
			}}
		>
			{props.children}
		</GameContext.Provider>
	);
};

export default GameState;
