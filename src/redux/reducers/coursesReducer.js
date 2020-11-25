const initialState = {
	data: [],
	loading: false,
	hasErrors: false,
	fetched: false,
};

const coursesReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		// GET ALL COURSES
		case 'GET_COURSES_LOADING':
			return { ...state, loading: true };
		case 'GET_COURSES_SUCCESS':
			return {
				data: payload,
				loading: false,
				hasErrors: false,
				fetched: true,
			};
		case 'GET_COURSES_FAILURE':
			return { ...state, loading: false, hasErrors: true };
		// ADD COURSE
		case 'ADD_COURSE_LOADING':
			return { ...state, loading: true };
		case 'ADD_COURSE_SUCCESS':
			return {
				data: [...state.data, payload],
				loading: false,
				hasErrors: false,
				fetched: true,
			};
		case 'ADD_COURSE_FAILURE':
			return { ...state, loading: false };
		// DELETE COURSE
		case 'DELETE_COURSE_LOADING':
			return { ...state, loading: true };
		case 'DELETE_COURSE_SUCCESS':
			return {
				data: state.data.filter((record) => record.id !== payload),
				loading: false,
				hasErrors: false,
				fetched: true,
			};
		case 'DELETE_COURSE_FAILURE':
			return { ...state, loading: false };
		default:
			return state;
	}
};

export default coursesReducer;
