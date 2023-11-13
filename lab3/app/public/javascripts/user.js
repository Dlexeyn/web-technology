import {send} from "./request.js";

$(document).ready(async () => {
	$("#saveButton").click(saveHandler);
});

async function saveHandler(){
	let id = $('#outputID').val();
	let name = $('#inputUsername').val();
	let lastName = $('#inputLastName').val();
	let middleName = $('#inputMiddleName').val();
	let mail = $('#inputEmailAddress').val();
	let birthDate = $('#inputBirthday').val();

	let role = $("#slctRole option:selected").text();
	let status = $("#slctStatus option:selected").text();


	if(checkInput(name) === 1)
		return;

	if(checkInput(lastName) === 1)
		return;

	if(checkInput(mail) === 1)
		return;

	const body = {
		id: id,
		name: name,
		lastName: lastName,
		middleName: middleName,
		mail: mail,
		birthDate: birthDate,
		role: role,
		status: status
	};

	console.log(body);
	const mess = await send("POST",
		'api/user/update', body);


	$('#saveLabel').text(mess);
	$('#saveLabel').show();
}

function checkInput(input){
	if (!input){
		alert("Заполните обязательные поля для заполнения!");
		return 1;
	}
	return 0;
}