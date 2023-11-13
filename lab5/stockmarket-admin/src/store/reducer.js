import * as actions from './actionTypes';

let lastId = 0;

export default function reducer(state = [], action) {
	console.log(action)
	switch (action.type) {
		case actions.STOCK_ADD:
			return [...state, {
				id: action.payload.stock.id,
				stock: action.payload.stock,
				completed: false,
			}];

		case actions.STOCK_TOGGLE:
			return state.map(task => {
				if (task.id === action.payload.id)
					return { ...task, completed: !task.completed }
				return task;
			});

		case actions.STOCK_REMOVE:
			return state.filter(task => action.payload.id !== task.id);

		default:
			return state;
	}
}