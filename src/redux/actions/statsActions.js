import axios from 'axios';
import { URL } from '../constants';

export const fetchStats = () => async (dispatch) => {
	dispatch({
		type: 'GET_STATS_LOADING',
	});
	try {
		const res = await axios.get(`${URL}/stats`);
		console.log(res);
		const data = res.data;
		dispatch({
			type: 'GET_STATS_SUCCESS',
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: 'GET_STATS_FAILURE',
		});
		console.log(err);
	}
};
