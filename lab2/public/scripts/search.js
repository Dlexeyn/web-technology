
function searchClick() {
	let text = document.getElementById("sField").value;
	let date = document.getElementById("date").value;
	let isStock = document.getElementById("inStock");
	console.log(date)
	console.log(isStock.checked)
	console.log(text);
	callAjax(text, date, isStock.checked, (response) => {
		try {
			let info = JSON.parse(response);
			addToTable(info);
		} catch (e) {
			console.log(e);
		}
	})
}

function callAjax(text, date, isStock, res){
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			res(this.responseText);
		}
	};

	let data = JSON.stringify({
		'text': `${text}`,
		'date': `${date}`,
		'isStock': `${isStock}`
	})
	xhr.open("POST", '/books/search', true);
	xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xhr.send(data);
}

function addToTable(data){
	console.log(data);
	let table = document.getElementById("outputTable");

	const len = table.rows.length;
	console.log()

	for (let i = len - 1; i >= 2; i -= 1) {
		table.deleteRow(i);
	}

	data.forEach(item => {
		let newRow = table.insertRow(table.rows.length);
		newRow.insertCell(0);
		createBookLink(item.id, item.title, newRow.cells[0]);
		newRow.insertCell(1).innerHTML = item.author;
		newRow.insertCell(2).innerHTML = item.edition_year;
		newRow.insertCell(3).innerHTML = item.inStock;
		newRow.insertCell(4).innerHTML = item.date;
	})
}

function createBookLink(id, title, col){
	let a = document.createElement('a');
	let text = document.createTextNode(title);
	a.appendChild(text);
	a.href = '/books/' + id;
	col.appendChild(a);
}