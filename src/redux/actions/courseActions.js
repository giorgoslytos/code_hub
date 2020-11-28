import axios from 'axios';
import {
	GET_COURSE_FAILURE,
	GET_COURSE_LOADING,
	GET_COURSE_SUCCESS,
	GET_STORED_COURSE_SUCCESS,
} from '../action-types';

const URL = process.env.REACT_APP_URL;

export const fetchCourse = (id) => async (dispatch) => {
	console.log('dispatch');
	dispatch({
		type: GET_COURSE_LOADING,
	});
	try {
		const res = await axios.get(`${URL}/courses/${id}`);
		const data = res.data;
		dispatch({
			type: GET_COURSE_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: GET_COURSE_FAILURE,
		});
		console.error(err);
	}
};

export const fetchCourseFromCourses = (data) => async (dispatch) => {
	dispatch({
		type: GET_STORED_COURSE_SUCCESS,
		payload: data,
	});
};
