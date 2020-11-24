import React, { useState } from 'react';
import {
	Button,
	Card,
	Container,
	Form,
	FormGroup,
	Input,
	Label,
} from 'reactstrap';

const AddEditCourse = () => {
	const [newCourse, setNewCourse] = useState({});

	function handelSubmit(e) {
		e.preventDefault();
	}

	function handleOnChange({ target: { name, value, checked } }) {
		if (name === 'instructors')
			setNewCourse({
				...newCourse,
				instructors:
					newCourse.instructors?.length > 0
						? checked
							? [...newCourse.instructors, value]
							: newCourse.instructors.filter((x) => x !== value)
						: [
								checked
									? value
									: newCourse.instructors.filter((x) => x !== value),
						  ],
			});
		else if (name === 'early_bird' || name === 'normal') {
			setNewCourse({
				...newCourse,
				price: { ...newCourse.price, [name]: value },
			});
		} else if (name === 'start_date' || name === 'end_date') {
			setNewCourse({
				...newCourse,
				dates: { ...newCourse.dates, [name]: value },
			});
		} else if (name === 'open') {
			setNewCourse({ ...newCourse, [name]: checked });
		} else setNewCourse({ ...newCourse, [name]: value });
	}

	return (
		<Container className="my-4">
			<Card className="jumbotron">
				<div className="h2 font-weight-normal">Add Course</div>
				<Form onSubmit={handelSubmit}>
					<FormGroup>
						<Label>Title:</Label>
						<Input
							type="text"
							name="title"
							id="title"
							placeholder="Title"
							onChange={handleOnChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Duration:</Label>
						<Input
							type="text"
							name="duration"
							id="duration"
							placeholder="Duration"
							onChange={handleOnChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Image path:</Label>
						<Input
							type="text"
							name="imagePath"
							id="imagePath"
							placeholder="Image path"
							onChange={handleOnChange}
						/>
					</FormGroup>
					<FormGroup check>
						<Label check>
							<Input type="checkbox" name="open" onChange={handleOnChange} />{' '}
							Bookable
						</Label>
					</FormGroup>
					<hr />
					<div className="h3 font-weight-normal">Instructors</div>
					<FormGroup check onChange={handleOnChange}>
						<div>
							<Label check>
								<Input type="checkbox" value="01" name="instructors" /> John
								Tsevdos
							</Label>
						</div>
						<div>
							<Label check>
								<Input type="checkbox" name="instructors" value="02" />
								Yiannis Nikolakopoulos
							</Label>
						</div>
					</FormGroup>
					<hr />
					<FormGroup>
						<Label>Description:</Label>
						<Input
							type="textarea"
							name="description"
							onChange={handleOnChange}
						/>
					</FormGroup>
					<hr />
					<div className="h3 font-weight-normal">Dates</div>
					<FormGroup>
						<Label for="exampleDate">Start date:</Label>
						<Input
							type="date"
							name="start_date"
							id="start_date"
							placeholder="date placeholder"
							onChange={handleOnChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="exampleDate">End date:</Label>
						<Input
							type="date"
							name="end_date"
							id="end_date"
							placeholder="date placeholder"
							onChange={handleOnChange}
						/>
					</FormGroup>
					<hr />
					<div className="h3 font-weight-normal">Price</div>
					<FormGroup>
						<Label for="early_bird">Early Bird:</Label>
						<Input
							type="number"
							name="early_bird"
							id="early_bird"
							placeholder={0}
							onChange={handleOnChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="normal_price">Normal Price:</Label>
						<Input
							type="number"
							name="normal"
							id="normal_price"
							onChange={handleOnChange}
							placeholder={0}
						/>
					</FormGroup>
					<hr />
					<Button color="primary float-right">Add Course</Button>
				</Form>
			</Card>
		</Container>
	);
};

export default AddEditCourse;
