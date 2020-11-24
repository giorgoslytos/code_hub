import axios from 'axios';
import { URL } from '../constants';

export const fetchCourses = () => async (dispatch) => {
	dispatch({
		type: 'GET_COURSES_LOADING',
	});
	try {
		const res = await axios.get(`${URL}/courses`);
		console.log(res);
		const data = res.data;
		dispatch({
			type: 'GET_COURSES_SUCCESS',
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: 'GET_COURSES_FAILURE',
		});
		console.log(err);
	}
};
