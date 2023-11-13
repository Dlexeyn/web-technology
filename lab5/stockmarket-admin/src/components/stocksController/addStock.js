import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import * as actions from "../../store/actions";

export function AddStock( {data, stock }){

	const [checked, setChecked] = useState(
		data.some(e => e.id === stock.id)
	);
	const dispatch = useDispatch();

	function soldCheckBox() {
		if(!checked){
			dispatch(actions.addStock({
				stock: stock
			}));
		} else {
			dispatch(actions.removeStock(stock.id))
		}
	}

	return (
		<div>
			<input type='checkbox' className='form-check-input' id={`check_${stock.id}`}
			       checked={checked}
			       onChange={() => {
				       setChecked(!checked);
				       soldCheckBox();
			       }}></input>
		</div>

	)
}


