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
		default:
			return state;
	}
};

export default coursesReducer;
