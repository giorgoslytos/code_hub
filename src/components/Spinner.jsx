import React from 'react';
import { Spinner } from 'reactstrap';

const CustomSpinner = () => {
	return (
		<div className="m-auto pt-3">
			<Spinner size="md" color="secondary" />
		</div>
	);
};

export default CustomSpinner;
