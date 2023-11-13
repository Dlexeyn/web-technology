function openForm(formId) {
	document.getElementById(formId).style.display = "block";
	document.getElementById('buttons').style.display = "none";

}

function closeForm(formId) {
	document.getElementById(formId).style.display = "none";
	if(formId !== 'book')
		document.getElementById('buttons').style.display = "flex";
}

async function takeBookClick(){

	let id = document.getElementById("outId").value;
	let date = document.getElementById("takeDate").value;
	let name = document.getElementById("takeName").value;

	if(!name){
		alert('Пожалуйста, заполните поле "Имя"');
		return;
	}
	if(!date){
		alert('Пожалуйста, заполните поле "Дата"');
		return;
	}


	let response = await fetch("/books/take/" + id, {
		method: "post",
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			id: id,
			inStock: false,
			date: date,
			name: name
		})
	})
	if(response.ok){
		let answer = await response.json();
		window.location = answer.redirect;
	}
}

async function returnBookClick(){
	let id = document.getElementById("outId").value;
	let response = await fetch("/books/return/" + id, {
		method: "post",
	})
	if(response.ok){
		let answer = await response.json();
		window.location = answer.redirect;
	}
}

async function deleteBookClick(){
	let id = document.getElementById("outId").value;
	let response = await fetch("/books/delete/" + id, {
		method: "delete",
	})
	if(response.ok){
		let answer = await response.json();
		window.location = answer.redirect;
	}
}

function editClick(){

}