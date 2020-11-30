import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NotFoundPage from './pages/NotFoundPage';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import Navigation from './components/Navigation';
import store from './redux/store';
import { Provider } from 'react-redux';
import Courses from './pages/Courses';
import Course from './pages/Course';
import AddEditCourse from './pages/AddEditCourse';

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Navigation>
				<Switch>
					<Route exact path={['/', '/homepage']} component={Dashboard} />
					<Route exact path={'/courses'} component={Courses} />
					<Route
						exact
						path={'/courses/add'}
						component={(props) => <AddEditCourse {...props} />}
					/>
					<Route
						exact
						path={'/courses/edit/:id'}
						component={(props) => <AddEditCourse {...props} />}
					/>
					<Route path={'/courses/:id'} component={Course} />
					<Route exact component={NotFoundPage} />
				</Switch>
			</Navigation>
		</Router>
	</Provider>,
	document.getElementById('root')
);
