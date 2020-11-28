import React, { useEffect, useRef } from 'react';
import { TiCancel, TiTick } from 'react-icons/ti';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	CardText,
	CardTitle,
	Col,
	Container,
	Row,
} from 'reactstrap';
import LazyImage from '../components/LazyImage';
import WithLoader from '../components/WithLoader';
import { fetchCourses } from '../redux/actions/coursesActions';

const SingleCourse = ({ course, courses }) => {
	const ref = useRef();
	return (
		<Card>
			<CardHeader>
				<CardTitle tag="h4" className="font-weight-normal">
					{course.title}
				</CardTitle>
			</CardHeader>
			<LazyImage
				effect="blur"
				top
				width="100%"
				src={
					process.env.PUBLIC_URL +
					(course.imagePath !== undefined && course.imagePath !== ''
						? course.imagePath
						: '/imageNotFound.jpg')
				}
				alt="Card image cap"
			/>
			<CardBody>
				<CardText>
					Price: <b>{course.price?.normal}€</b> | Bookable{' '}
					{course.open ? (
						<TiTick className="text-success h3 m-0 mt-n1" />
					) : (
						<TiCancel className="text-danger" />
					)}
				</CardText>
				<CardText>
					Duration: <b>{course.duration}</b>
				</CardText>
				<CardText>
					Dates: <b>{course.dates?.start_date.replaceAll('-', '/')}</b> -{' '}
					<b>{course.dates?.end_date.replaceAll('-', '/')}</b>
				</CardText>
				<Button
					color="primary"
					className="float-right"
					tag={Link}
					to={{
						pathname: `/courses/${course.id}/${encodeURI(
							course.title?.trim().replace(/\s+/g, '-')
						)}`,
						course,
					}}
				>
					View
				</Button>
			</CardBody>
		</Card>
	);
};

const Courses = () => {
	const dispatch = useDispatch();
	const courses = useSelector((state) => state.coursesReducer);

	useEffect(() => {
		if (!courses.fetched) dispatch(fetchCourses());
	}, []);

	return (
		<Container>
			<h1 className="h2 font-weight-normal mt-4 mb-2">All Courses</h1>
			<Row>
				<WithLoader loading={courses?.loading}>
					{courses.data.map((course, index) => (
						<Col xs={12} md={6} lg={4} className="my-3" key={course.id}>
							<SingleCourse course={course} courses={courses} />
						</Col>
					))}
				</WithLoader>
			</Row>
		</Container>
	);
};

export default Courses;
