import React, { useEffect, useState } from 'react';
import { Button, ListGroup, ListGroupItem, Table, Tooltip } from 'reactstrap';
import { BsInfoSquareFill as InfoIcon } from 'react-icons/bs';
import { TiTick, TiCancel } from 'react-icons/ti';
import removeMarkupAndCrop from '../utils/removeMarkupAndCrop';
import { Link } from 'react-router-dom';

const DataTable = ({ data }) => {
	const [tooltipOpen, setTooltipOpen] = useState();

	const toggle = (id) => {
		setTooltipOpen({ ...tooltipOpen, [id]: !tooltipOpen[id] });
	};

	useEffect(() => {
		const obj = {};
		data.forEach((x) => (obj[x.id] = false));
		setTooltipOpen(obj);
	}, [data]);

	return (
		<>
			<ListGroup className="mt-3">
				<ListGroupItem className="bg-light">Last 5 Courses</ListGroupItem>
			</ListGroup>
			<Table responsive className="border">
				<thead>
					<tr>
						<th></th>
						<th>Title</th>
						<th>Bookable</th>
						<th>Price</th>
						<th>Date</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{data.map((row) => (
						<tr key={row.id}>
							<th scope="row">
								<a
									id={'Tooltip-' + row.id}
									style={{ cursor: 'pointer', padding: '2px' }}
								>
									<InfoIcon className="text-primary" />
								</a>
								<Tooltip
									placement="top"
									isOpen={tooltipOpen && tooltipOpen[row.id]}
									target={'Tooltip-' + row.id}
									toggle={() => toggle(row.id)}
								>
									<div>{removeMarkupAndCrop(row.description)}</div>
								</Tooltip>
							</th>
							<td>{row.title}</td>
							<td>
								{row.open ? (
									<TiTick className="text-success h3 m-0 mt-n1" />
								) : (
									<TiCancel className="text-danger h3 m-0 mt-n1" />
								)}
							</td>
							<td>{row.price?.normal}</td>
							<td>{`${row.dates?.start_date?.replaceAll(
								'-',
								'/'
							)} - ${row.dates?.end_date?.replaceAll('-', '/')}`}</td>
							<td>
								<Button
									color="info"
									tag={Link}
									to={`/courses/${row.id}/${encodeURI(
										row.title?.trim().replace(/\s+/g, '-')
									)}`}
								>
									View Details
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			<ListGroup className="mt-n3" align="right">
				<ListGroupItem className="bg-light">
					<Button color="primary" tag={Link} to="/courses">
						View All
					</Button>
				</ListGroupItem>
			</ListGroup>
		</>
	);
};

export default DataTable;
