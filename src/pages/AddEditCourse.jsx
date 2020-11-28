import React, { useEffect, useRef, useState } from 'react';
import {
	Button,
	Card,
	Container,
	FormFeedback,
	FormGroup,
	Input,
	Label,
} from 'reactstrap';
import { Formik, Field, Form } from 'formik';
import addEditvalidationSchema from '../utils/addEditvalidationSchema';
import { useDispatch } from 'react-redux';
import {
	addCourse,
	editCourse,
	fetchCourses,
} from '../redux/actions/coursesActions';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import axios from 'axios';
import RecordNotFound from '../components/RecordNotFound';
import WithLoader from '../components/WithLoader';

const AddEditCourse = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { id } = useParams();
	const [error, setError] = useState(false);
	const URL = process.env.REACT_APP_URL;
	const [dataFetched, setDataFetched] = useState(false);
	const formikRef = useRef();

	const populateForm = (course) => {
		console.log(course);
		Object.keys(course).forEach((props) =>
			formikRef.current.setFieldValue(props, course[props])
		);
	};

	const getCourse = async () => {
		try {
			console.log('yolo');
			const res = await axios.get(`${URL}/courses/${id}`);
			console.log(res.data);
			console.log(formikRef);
			setDataFetched(true);
			populateForm(res.data);
		} catch (err) {
			setError(true);
			console.log(err);
		}
	};

	useEffect(() => {
		if (!history.location.course) getCourse();
		else setDataFetched(true);
	}, []);

	const instructorsArr = [
		{ id: '01', name: 'John Tsevdos' },
		{ id: '02', name: 'Yiannis Nikolakopoulos' },
	];

	function handleCancel() {
		history.goBack();
	}

	return error ? (
		<RecordNotFound />
	) : (
		<WithLoader loading={history.location.mode === 'edit' && !dataFetched}>
			<Formik
				initialValues={{
					title: history.location.course?.title,
					duration: history.location.course?.duration,
					imagePath: history.location.course?.imagePath,
					open: history.location.course?.open,
					instructors: history.location.course?.instructors,
					description: history.location.course?.description,
					dates: {
						start_date: history.location.course?.dates?.start_date,
						end_date: history.location.course?.dates?.end_date,
					},
					price: {
						normal: history.location.course?.price?.normal,
						early_bird: history.location.course?.price?.early_bird,
					},
				}}
				onSubmit={(data, { setSubmitting }) => {
					setSubmitting(true);
					// make async call
					history.location.pathname === '/courses/add'
						? dispatch(addCourse(data))
						: dispatch(editCourse({ ...data, id }));
					setSubmitting(false);
					history.push('/');
				}}
				innerRef={formikRef}
				validationSchema={addEditvalidationSchema}
			>
				{({ errors, isSubmitting }) => (
					<Container className="my-4">
						<Card className="jumbotron">
							<div className="h2 font-weight-normal">Add Course</div>
							<Form>
								<FormGroup>
									<Label>Title:</Label>
									<Field
										type="text"
										placeholder="Title"
										name="title"
										invalid={errors.title}
										as={Input}
									/>
									<FormFeedback>{errors.title}</FormFeedback>
								</FormGroup>
								<FormGroup>
									<Label>Duration:</Label>
									<Field
										type="text"
										placeholder="Duration"
										name="duration"
										invalid={errors.duration}
										as={Input}
									/>
									<FormFeedback>{errors.duration}</FormFeedback>
								</FormGroup>
								<FormGroup>
									<Label>Image path:</Label>
									<Field
										type="text"
										name="imagePath"
										as={Input}
										placeholder="Image path"
									/>
								</FormGroup>
								<FormGroup check>
									<Label check>
										<Field type="checkbox" name="open" as={Input} />
										Bookable
									</Label>
								</FormGroup>
								<hr />
								<div className="h3 font-weight-normal">Instructors</div>
								<FormGroup check>
									{instructorsArr.map((instructor) => (
										<div>
											<Label check>
												<Field
													type="checkbox"
													name="instructors"
													value={instructor.id}
													as={Input}
												/>
												{instructor.name}
											</Label>
										</div>
									))}
									<p className="text-danger">
										<small>{errors.instructors}</small>
									</p>
								</FormGroup>
								<hr />
								<FormGroup>
									<Label>Description:</Label>
									<Field
										type="textarea"
										name="description"
										as={Input}
										invalid={errors.description}
									/>
									<FormFeedback>{errors.description}</FormFeedback>
								</FormGroup>
								<hr />
								<div className="h3 font-weight-normal">Dates</div>
								<FormGroup>
									<Label for="exampleDate">Start date:</Label>
									<Field
										type="date"
										name="dates.start_date"
										placeholder="date placeholder"
										invalid={errors.dates?.start_date}
										as={Input}
									/>
									<FormFeedback>{errors.dates?.start_date}</FormFeedback>
								</FormGroup>
								<FormGroup>
									<Label for="exampleDate">End date:</Label>
									<Field
										type="date"
										name="dates.end_date"
										placeholder="date placeholder"
										invalid={errors.dates?.end_date}
										as={Input}
									/>
									<FormFeedback>{errors.dates?.end_date}</FormFeedback>
								</FormGroup>
								<hr />
								<div className="h3 font-weight-normal">Price</div>
								<FormGroup>
									<Label for="early_bird">Early Bird:</Label>
									<Field
										type="number"
										name="price.early_bird"
										placeholder={0}
										invalid={errors.price?.early_bird}
										as={Input}
									/>
									<FormFeedback>{errors.price?.early_bird}</FormFeedback>
								</FormGroup>
								<FormGroup>
									<Label for="normal_price">Normal Price:</Label>
									<Field
										type="number"
										name="price.normal"
										placeholder={0}
										invalid={errors.price?.normal}
										as={Input}
									/>
									<FormFeedback>{errors.price?.normal}</FormFeedback>
								</FormGroup>
								<hr />
								<div className="d-flex justify-content-end">
									<Button color="danger" type="button" onClick={handleCancel}>
										Cancel
									</Button>
									<Button
										type="submit"
										className="ml-2"
										disabled={isSubmitting}
										color="primary float-right"
										disabled={Object.keys(errors).length !== 0}
									>
										{history.location.pathname === '/courses/add'
											? 'Add Course'
											: 'Edit Course'}
									</Button>
								</div>
							</Form>
						</Card>
					</Container>
				)}
			</Formik>
		</WithLoader>
	);
};

export default AddEditCourse;
