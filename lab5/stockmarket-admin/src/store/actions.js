import * as actions from './actionTypes';

export const addStock = stock => ({
	type: actions.STOCK_ADD,
	payload: stock
});

export const toggleStock = id => ({
	type: actions.STOCK_TOGGLE,
	payload: { id }
});

export const removeStock = id => ({
	type: actions.STOCK_REMOVE,
	payload: { id }
})