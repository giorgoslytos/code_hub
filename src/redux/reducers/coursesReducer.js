import {
	GET_COURSES_LOADING,
	GET_COURSES_SUCCESS,
	GET_COURSES_FAILURE,
	ADD_COURSE_LOADING,
	ADD_COURSE_SUCCESS,
	ADD_COURSE_FAILURE,
	DELETE_COURSE_LOADING,
	DELETE_COURSE_SUCCESS,
	DELETE_COURSE_FAILURE,
	EDIT_COURSE_LOADING,
	EDIT_COURSE_SUCCESS,
	EDIT_COURSE_FAILURE,
} from '../action-types';

const initialState = {
	data: [],
	loading: false,
	hasErrors: false,
	fetched: false,
};

const coursesReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		// GET ALL COURSES
		case GET_COURSES_LOADING:
			return { ...state, loading: true };
		case GET_COURSES_SUCCESS:
			return {
				data: payload,
				loading: false,
				hasErrors: false,
				fetched: true,
			};
		case GET_COURSES_FAILURE:
			return { ...state, loading: false, hasErrors: true };
		// ADD COURSE
		case ADD_COURSE_LOADING:
			return { ...state, loading: true };
		case ADD_COURSE_SUCCESS:
			return {
				data: [...state.data, payload],
				loading: false,
				hasErrors: false,
				fetched: true,
			};
		case ADD_COURSE_FAILURE:
			return { ...state, loading: false };
		// DELETE COURSE
		case DELETE_COURSE_LOADING:
			return { ...state, loading: true };
		case DELETE_COURSE_SUCCESS:
			return {
				data: state.data.filter((record) => record.id !== payload),
				loading: false,
				hasErrors: false,
				fetched: true,
			};
		case DELETE_COURSE_FAILURE:
			return { ...state, loading: false };
		// EDIT COURSE
		case EDIT_COURSE_LOADING:
			return { ...state, loading: true };
		case EDIT_COURSE_SUCCESS:
			return {
				data: state.data.map((record) =>
					record.id !== payload.id ? record : payload
				),
				loading: false,
				hasErrors: false,
				fetched: true,
			};
		case EDIT_COURSE_FAILURE:
			return { ...state, loading: false };
		default:
			return state;
	}
};

export default coursesReducer;
