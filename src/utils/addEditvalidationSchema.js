import * as yup from 'yup';

const addEditvalidationSchema = yup.object({
	title: yup.string().required('Title is arequired').max(50),
	duration: yup.string().required('Duration is required').max(40),
	description: yup.string().required('Description is required'),
	instructors: yup.array().min(1, 'At least one instructor should be selected'),
	dates: yup.object().shape({
		start_date: yup.date().required('Starting Date is required'),
		end_date: yup.date().required('Ending Date is required'),
	}),
	price: yup.object().shape({
		normal: yup
			.number()
			.required('Price is required')
			.min(0, 'Normal Price should be a positive number'),
		early_bird: yup.number().min(0, 'Early Bird should be a positive number'),
	}),
});

export default addEditvalidationSchema;
