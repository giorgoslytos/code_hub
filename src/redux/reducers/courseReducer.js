const initialState = {
	data: [],
	loading: false,
	hasErrors: false,
	fetched: false,
};

const courseReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'GET_COURSE_LOADING':
			return { ...state, loading: true };
		case 'GET_COURSE_SUCCESS':
			return {
				data: payload,
				loading: false,
				hasErrors: false,
				fetched: true,
			};
		case 'GET_COURSE_FAILURE':
			return { ...state, loading: false, hasErrors: true };
		case 'GET_STORED_COURSE_SUCCESS':
			return { data: payload, loading: false, hasErrors: false, fetched: true };
		default:
			return state;
	}
};

export default courseReducer;
