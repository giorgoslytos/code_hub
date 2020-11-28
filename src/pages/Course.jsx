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

const Course = () => {
	const { id } = useParams();
	const history = useHistory();
	const [course, setCourse] = useState(history.location.course);
	const [error, setError] = useState(false);
	const [instructors, setInstructors] = useState();
	const URL = process.env.REACT_APP_URL;

	const fetchCourse = async () => {
		if (!course) {
			try {
				const res = await axios.get(`${URL}/courses/${id}`);
				setCourse(res.data);
				fetchInstructors();
			} catch (err) {
				setError(true);
				console.log(err);
			}
		}
	};

	const fetchInstructors = async () => {
		const promises = course?.instructors?.map((id) => {
			console.log('enntered', id);
			return axios.get(`${URL}/instructors/${id}`);
		});
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
		fetchCourse();
		console.log(history.location.course);
	}, []);

	useEffect(() => {
		fetchInstructors();
	}, [course]);

	function handleEdit() {
		history.push({
			pathname: `/courses/edit/${id}`,
			state: course,
		});
	}

	return error ? (
		<RecordNotFound />
	) : (
		<WithLoader loading={!course}>
			<Container>
				<div className="h2 font-weight-normal mt-4">{course?.title}</div>
				<LazyImage
					effect="blur"
					width="100%"
					src={
						process.env.PUBLIC_URL +
						(course?.imagePath !== undefined && course?.imagePath !== ''
							? course?.imagePath
							: '/imageNotFound.jpg')
					}
					alt="Card cap"
					style={{ height: '300px' }}
				/>
				<hr />
				<div className="h5 font-weight-normal">
					<Row className="mb-2">
						<Col>Price: {course?.price?.normal} €</Col>
						<Col className="text-right">Duration: {course?.duration}</Col>
					</Row>
					<Row className="mb-5">
						<Col>
							Bookable:{' '}
							{course?.open ? (
								<TiTick className="text-success h3 m-0 mt-n1" />
							) : (
								<TiCancel className="text-danger h3 m-0 mt-n1" />
							)}{' '}
						</Col>
						<Col className="text-right">
							Dates: {course?.dates?.start_date.replaceAll('-', '/')} -{' '}
							{course?.dates?.end_date.replaceAll('-', '/')}
						</Col>
					</Row>
				</div>
				<div dangerouslySetInnerHTML={{ __html: course?.description }}></div>

				<Button color="primary" onClick={handleEdit}>
					Edit
				</Button>
				<div className="d-inline-block ml-2">
					<DeleteModal id={course?.id} linkTo="/courses/" buttonLabel="Delete">
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
