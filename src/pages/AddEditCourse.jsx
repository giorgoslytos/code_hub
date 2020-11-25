import React, { useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { addCourse } from '../redux/actions/coursesActions';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { fetchCourse } from '../redux/actions/courseActions';

const AddEditCourse = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { id } = useParams();
	const location = useLocation();
	const course = useSelector((state) => state.courseReducer);

	useEffect(() => {
		console.log(id);
		console.log(location);
		dispatch(fetchCourse(id));
	}, []);

	useEffect(() => {
		console.log(course?.data?.title);
	}, [course]);

	return (
		<Formik
			initialValues={{
				title: course?.data?.title,
				duration: course.duration,
				imagePath: '',
				open: false,
				instructors: [],
				description: '',
				dates: { start_date: '', end_date: '' },
				price: { normal: 0, early_bird: 0 },
			}}
			onSubmit={(data, { setSubmitting }) => {
				setSubmitting(true);
				// make async call
				console.log(data);
				dispatch(addCourse(data));
				setSubmitting(false);
				history.push('/courses/');
			}}
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
								<div>
									<Label check>
										<Field
											type="checkbox"
											name="instructors"
											value="01"
											as={Input}
										/>{' '}
										John Tsevdos
									</Label>
								</div>
								<div>
									<Label check>
										<Field
											type="checkbox"
											name="instructors"
											value="02"
											as={Input}
										/>
										Yiannis Nikolakopoulos
									</Label>
								</div>
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
							<Button
								type="submit"
								disabled={isSubmitting}
								color="primary float-right"
								disabled={Object.keys(errors).length !== 0}
							>
								Add Course
							</Button>
						</Form>
					</Card>
				</Container>
			)}
		</Formik>
	);
};

export default AddEditCourse;