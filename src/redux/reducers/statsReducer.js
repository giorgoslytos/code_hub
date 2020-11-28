import {
	GET_STATS_LOADING,
	GET_STATS_SUCCESS,
	GET_STATS_FAILURE,
} from '../action-types';

const initialState = {
	data: [],
	loading: false,
	hasErrors: false,
	fetched: false,
};

const statsReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		// GET ALL STATS
		case GET_STATS_LOADING:
			return { ...state, loading: true };
		case GET_STATS_SUCCESS:
			return {
				data: payload,
				loading: false,
				hasErrors: false,
				fetched: true,
			};
		case GET_STATS_FAILURE:
			return { ...state, loading: false, hasErrors: true };
		default:
			return state;
	}
};

export default statsReducer;
