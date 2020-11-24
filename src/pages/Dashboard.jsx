import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Badge,
	Card,
	CardBody,
	CardText,
	Col,
	Jumbotron,
	Row,
} from 'reactstrap';
import DataTable from '../components/DataTable';
import Spinner from '../components/Spinner';
import { fetchStats } from '../redux/actions/statsActions';
import { fetchCourses } from '../redux/actions/coursesActions';

const Dashboard = () => {
	const dispatch = useDispatch();
	const stats = useSelector((state) => state.statsReducer);
	const courses = useSelector((state) => state.coursesReducer);

	useEffect(() => {
		if (!courses.fetched) dispatch(fetchCourses());
		if (!stats.fetched) dispatch(fetchStats());
	}, []);

	return (
		<div>
			<Jumbotron className="mt-4 mb-3">
				<h1 className="h2 font-weight-normal">
					Welcome to Code.Hub Dashboard!
				</h1>
				<p>Manage everything and have fun!</p>
			</Jumbotron>
			<Row>
				{!stats.loading ? (
					stats.data?.map((stat) => (
						<Col style={{ padding: '15px' }} key={stat.id}>
							<Card>
								<CardBody>
									{stat.title.toUpperCase()}:{' '}
									<Badge color="secondary">{stat.amount}</Badge>
								</CardBody>
							</Card>
						</Col>
					))
				) : (
					<Spinner />
				)}
			</Row>
			<DataTable data={courses.data.slice(0, 5)} />
		</div>
	);
};

export default Dashboard;
