import axios from 'axios';
import {
	ADD_COURSE_FAILURE,
	ADD_COURSE_LOADING,
	ADD_COURSE_SUCCESS,
	DELETE_COURSE_FAILURE,
	DELETE_COURSE_LOADING,
	DELETE_COURSE_SUCCESS,
	EDIT_COURSE_FAILURE,
	EDIT_COURSE_LOADING,
	EDIT_COURSE_SUCCESS,
	GET_COURSES_FAILURE,
	GET_COURSES_LOADING,
	GET_COURSES_SUCCESS,
} from '../action-types';

const URL = process.env.REACT_APP_URL;

export const fetchCourses = () => async (dispatch) => {
	dispatch({
		type: GET_COURSES_LOADING,
	});
	try {
		const res = await axios.get(`${URL}/courses`);
		console.log(res);
		const data = res.data;
		dispatch({
			type: GET_COURSES_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: GET_COURSES_FAILURE,
		});
		console.error(err);
	}
};

export const addCourse = (course) => async (dispatch) => {
	dispatch({
		type: ADD_COURSE_LOADING,
	});
	try {
		const res = await axios.post(`${URL}/courses`, course);
		console.log(res.data);
		dispatch({
			type: ADD_COURSE_SUCCESS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: ADD_COURSE_FAILURE,
		});
		console.error(err);
	}
};

export const deleteCourse = (id) => async (dispatch) => {
	dispatch({
		type: DELETE_COURSE_LOADING,
	});
	try {
		await axios.delete(`${URL}/courses/${id}`);
		dispatch({
			type: DELETE_COURSE_SUCCESS,
			payload: id,
		});
	} catch (err) {
		dispatch({
			type: DELETE_COURSE_FAILURE,
		});
		console.error(err);
	}
};

export const editCourse = (course) => async (dispatch) => {
	dispatch({
		type: EDIT_COURSE_LOADING,
	});
	try {
		const res = await axios.put(`${URL}/courses/${course.id}`, course);
		console.log(res);
		dispatch({
			type: EDIT_COURSE_SUCCESS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: EDIT_COURSE_FAILURE,
		});
		console.error(err);
	}
};
