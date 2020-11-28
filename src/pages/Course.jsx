import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { TiCancel, TiTick } from 'react-icons/ti';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Col, Container, Row } from 'reactstrap';
import DeleteModal from '../components/DeleteModal';
import LazyImage from '../components/LazyImage';
import RecordNotFound from '../components/RecordNotFound';
import WithLoader from '../components/WithLoader';
import {
	fetchCourse,
	fetchCourseFromCourses,
} from '../redux/actions/courseActions';

const Course = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const courses = useSelector((state) => state.coursesReducer);
	const course = useSelector((state) => state.courseReducer);
	const [instructors, setInstructors] = useState();
	const history = useHistory();
	const URL = process.env.REACT_APP_URL;

	const handleCourse = () => {
		const courseFromMemory = courses.data.find((x) => x.id === id);
		if (course && courses.fetched && courseFromMemory) {
			dispatch(fetchCourseFromCourses(courseFromMemory));
		} else {
			dispatch(fetchCourse(id));
		}
		fetchInstructors();
	};

	const fetchInstructors = async () => {
		const promises = course.data.instructors?.map((id) =>
			axios.get(`${URL}/instructors/${id}`)
		);
		await axios
			.all(promises)
			.then(
				axios.spread((...responses) =>
					setInstructors(responses.map((x) => x.data))
				)
			)
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		handleCourse();
	}, []);

	function handleEdit() {
		history.push({
			pathname: `/courses/edit/${id}`,
			state: { course },
		});
	}

	return course.hasErrors ? (
		<RecordNotFound />
	) : (
		<WithLoader loading={course?.loading}>
			<Container>
				<div className="h2 font-weight-normal mt-4">{course.data.title}</div>
				<LazyImage
					effect="blur"
					width="100%"
					src={
						process.env.PUBLIC_URL +
						(course.data.imagePath !== undefined && course.data.imagePath !== ''
							? course.data.imagePath
							: '/imageNotFound.jpg')
					}
					alt="Card cap"
					style={{ height: '300px' }}
				/>
				<hr />
				<div className="h5 font-weight-normal">
					<Row className="mb-2">
						<Col>Price: {course.data.price?.normal} €</Col>
						<Col className="text-right">Duration: {course.data.duration}</Col>
					</Row>
					<Row className="mb-5">
						<Col>
							Bookable:{' '}
							{course.data.open ? (
								<TiTick className="text-success h3 m-0 mt-n1" />
							) : (
								<TiCancel className="text-danger h3 m-0 mt-n1" />
							)}{' '}
						</Col>
						<Col className="text-right">
							Dates: {course.data.dates?.start_date.replaceAll('-', '/')} -{' '}
							{course.data.dates?.end_date.replaceAll('-', '/')}
						</Col>
					</Row>
				</div>
				<div
					dangerouslySetInnerHTML={{ __html: course.data.description }}
				></div>

				<Button color="primary" onClick={handleEdit}>
					Edit
				</Button>
				<div className="d-inline-block ml-2">
					<DeleteModal id={id} buttonLabel="Delete">
						Delete
					</DeleteModal>
				</div>

				<div className="h2 font-weight-normal my-4">Instructors</div>
				<Row>
					<WithLoader loading={!instructors}>
						<>
							{instructors?.map((instructor) => (
								<Col xs={12} md={6} key={instructor.id}>
									<div className="h3 font-weight-normal">
										{instructor.name.first} {instructor.name.last}{' '}
										<span className="h4 font-weight-normal">
											({instructor.dob})
										</span>
									</div>
									<p>
										Email:{' '}
										<a href={`mailto: ${instructor.email}`}>
											{instructor.email}
										</a>{' '}
										|<a href={instructor.linkedin}> LinkedIn</a>
									</p>
									<p>{instructor.bio}</p>
								</Col>
							))}
						</>
					</WithLoader>
				</Row>
			</Container>
		</WithLoader>
	);
};

export default Course;
