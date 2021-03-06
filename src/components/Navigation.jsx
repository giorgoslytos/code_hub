import React, { useState } from 'react';
import { NavLink as Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import {
	Collapse,
	Navbar,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	NavbarToggler,
} from 'reactstrap';

const Navigation = (props) => {
	const [collapsed, setCollapsed] = useState(true);

	const footerStyle = {
		position: 'fixed',
		width: '100%',
		bottom: 0,
	};

	const toggleNavbar = () => setCollapsed(!collapsed);
	return (
		<>
			<Navbar color="dark" dark expand="md">
				<NavbarBrand tag={Link} to="/">
					Code.Hub Dashboard
				</NavbarBrand>
				<NavbarToggler onClick={toggleNavbar} className="mr-2" />
				<Collapse isOpen={!collapsed} navbar>
					<Nav className="ml-auto" navbar>
						<NavLink tag={Link} to="/courses" exact>
							Courses
						</NavLink>
						<NavItem>
							<NavLink
								tag={Link}
								to={{ pathname: '/courses/add', course: { mode: 'add' } }}
							>
								Add new course
							</NavLink>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
			<Container fluid className="mb-4">
				{props.children}
			</Container>
			<div className="text-center my-4">
				Created by George Litos for the Code Hub React Workshop, 2020
			</div>
		</>
	);
};

export default Navigation;
