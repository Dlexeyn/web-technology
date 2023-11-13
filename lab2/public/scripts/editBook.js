window.onload = () => {
	let checkbox = document.querySelector("input[id=inStock]");
	checkbox.addEventListener('change', changeStockState);
}

function changeStockState(){
	document.getElementsByName('user')[0].disabled = !!this.checked;
	document.getElementsByName('date')[0].disabled = !!this.checked;
}

async function editClick(ID){
	let book = {};
	const authorIn = document.getElementsByName('author')[0];
	const titleIn = document.getElementsByName('title')[0];
	const edition_yearIn = document.getElementsByName('edition')[0];
	const inStockIn = document.getElementById('inStock');
	const dateIn = document.getElementsByName('date')[0];

	book.author = authorIn.value;
	book.title = titleIn.value;
	book.edition_year = edition_yearIn.value;
	book.inStock = inStockIn.checked + '';
	book.date = dateIn.value;

	if(book.inStock === 'false'){
		book.userName = document.getElementsByName('user')[0].value;
	}

	let response = await fetch(`/books/${ID}`, {
		method: "put",
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(book)
	});

	if(response.ok){
		let answer = await response.json();
		location.href = answer.redirect;
	}
}