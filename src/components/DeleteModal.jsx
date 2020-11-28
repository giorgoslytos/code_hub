import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { deleteCourse } from '../redux/actions/coursesActions';

const DeleteModal = (props) => {
	const { buttonLabel, id } = props;
	const history = useHistory();
	const [modal, setModal] = useState(false);
	const dispatch = useDispatch();

	const toggle = () => setModal(!modal);

	const handleOk = () => {
		dispatch(deleteCourse(id));
		history.push(props.linkTo);
	};

	return (
		<div>
			<Button color="danger" onClick={toggle}>
				{buttonLabel}
			</Button>
			<Modal isOpen={modal} toggle={toggle}>
				<ModalHeader toggle={toggle}>Delete Confirmation</ModalHeader>
				<ModalBody>
					This action will permenantly delete a record from the database. Are
					you sure you want to proceed?
				</ModalBody>
				<ModalFooter>
					<Button color="secondary" onClick={toggle}>
						Cancel
					</Button>
					<Button color="primary" onClick={handleOk}>
						OK
					</Button>{' '}
				</ModalFooter>
			</Modal>
		</div>
	);
};

export default DeleteModal;
