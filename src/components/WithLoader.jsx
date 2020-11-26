import React, { useEffect } from 'react';
import { Spinner } from 'reactstrap';

const WithLoader = (props) => {
	useEffect(() => {
		console.log(props);
	}, [props]);
	return props.loading ? (
		<div className="m-auto text-center pt-3">
			<Spinner size="md" color="secondary" />
		</div>
	) : (
		props.children
	);
};

export default WithLoader;
