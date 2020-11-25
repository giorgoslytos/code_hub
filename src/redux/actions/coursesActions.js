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

export const addCourse = (course) => async (dispatch) => {
	dispatch({
		type: 'ADD_COURSE_LOADING',
	});
	try {
		const res = await axios.post(`${URL}/courses`, course);
		console.log(res.data);
		dispatch({
			type: 'ADD_COURSE_SUCCESS',
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: 'ADD_COURSE_FAILURE',
		});
		console.log(err);
	}
};

export const deleteCourse = (id) => async (dispatch) => {
	dispatch({
		type: 'DELETE_COURSE_LOADING',
	});
	try {
		await axios.delete(`${URL}/courses/${id}`);
		dispatch({
			type: 'DELETE_COURSE_SUCCESS',
			payload: id,
		});
	} catch (err) {
		dispatch({
			type: 'DELETE_COURSE_FAILURE',
		});
		console.log(err);
	}
};
