import axios from 'axios';
import {
	GET_STATS_LOADING,
	GET_STATS_SUCCESS,
	GET_STATS_FAILURE,
} from '../action-types';
const URL = process.env.REACT_APP_URL;

export const fetchStats = () => async (dispatch) => {
	dispatch({
		type: GET_STATS_LOADING,
	});
	try {
		const res = await axios.get(`${URL}/stats`);
		console.log(res);
		const data = res.data;
		dispatch({
			type: GET_STATS_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: GET_STATS_FAILURE,
		});
		console.error(err);
	}
};
