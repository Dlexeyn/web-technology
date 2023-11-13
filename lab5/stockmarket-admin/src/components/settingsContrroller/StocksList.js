import React from 'react';

const StocksList = ( {stocks} ) => {

	if (stocks.length) {
		return (
			<div>
				<h5 className="mb-4">Выбранные компании</h5>
				<table className='table'>
					<thead>
					<th>Название компании</th>
					<th>Цена акции</th>
					</thead>

					<tbody>
					{
						stocks.map(item =>
							<tr>
								<td>{item.name}</td>
								<td>{item.price}</td>
							</tr>
						)
					}
					</tbody>
				</table>
			</div>
		)
	}
	else return null;
}

export default StocksList;