import axios from 'axios';
import { URL } from '../constants';

export const fetchCourse = (id) => async (dispatch) => {
	console.log('dispatch');
	dispatch({
		type: 'GET_COURSE_LOADING',
	});
	try {
		const res = await axios.get(`${URL}/courses/${id}`);
		const data = res.data;
		dispatch({
			type: 'GET_COURSE_SUCCESS',
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: 'GET_COURSE_FAILURE',
		});
		console.log(err);
	}
};

export const fetchCourseFromCourses = (data) => async (dispatch) => {
	dispatch({
		type: 'GET_STORED_COURSE_SUCCESS',
		payload: data,
	});
};
