window.onload = () => {
	let checkbox = document.querySelector("input[id=inStock]");
	checkbox.addEventListener('change', function() {
		document.getElementsByName('user')[0].disabled = !!this.checked;
		document.getElementsByName('date')[0].disabled = !!this.checked;
	});
}

async function addClick() {
	let book = {};
	const authorIn = document.getElementsByName('author')[0];
	const titleIn = document.getElementsByName('title')[0];
	const edition_yearIn = document.getElementsByName('edition')[0];
	const inStockIn = document.getElementById('inStock');
	const dateIn = document.getElementsByName('date')[0];

	book.author = authorIn.value;
	book.title = titleIn.value;
	book.edition_yearIn = edition_yearIn.value;
	book.inStock = inStockIn.checked;
	book.date = dateIn.value;

	if(book.inStock === 'false'){
		book.userName = document.getElementsByName('user')[0].value;
	}

	let response = await fetch("/books/post/", {
		method: "post",
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(book)
	});

	if(response.ok){
		let answer = await response.json();
		this.activateBookBtn(answer.id);
	}
}

function activateBookBtn(id) {
	let bookBtn = document.getElementById("bookBtn");
	bookBtn.style.cssText = "visibility: visible;"
	bookBtn.addEventListener('click', function () {
		location.href = `/books/${id}`;
	})
}