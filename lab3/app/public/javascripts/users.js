import {send} from "./request.js";

async function handleChangeSelect() {
	const elementId = this.id;
	const values = this.value.split('_');
	const id = values[1];
	let type = this.id.split('_')[0];

	const value = $("#" + elementId + " option:selected").text();

	if (type === 'slctStatus')
		type = 'status';
	else if (type === 'slctRole')
		type = 'role';

	let body = {
		type: type,
		id: id,
		value: value
	}

	const status = await send("POST",
		'api/admin/set', body);
}

$(document).ready(async () => {
	$('.select-role').on('change', handleChangeSelect);
	$('.select-status').on('change', handleChangeSelect);
});

