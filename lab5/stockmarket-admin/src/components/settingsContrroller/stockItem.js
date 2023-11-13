import React from "react";
import { useDispatch } from "react-redux";
import { Form, ListGroup } from "react-bootstrap";

const Stock = ({ Stock }) => {

	console.log(Stock)
	return (
		<ListGroup.Item className={completed && 'task-completed'}>
			<td></td>
		</ListGroup.Item>
	)
}

export default Stock;