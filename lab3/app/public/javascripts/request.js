const SERVER = "http://localhost:8080/";
async function send(method, url, body = null) {
	url = SERVER + url;
	let options = {
		method: method,
		headers: {'Content-Type': 'application/json'},
	};
	if (body){
		options.body = JSON.stringify(body);
	}

	console.log(body)

	await fetch(url, options).then(toJSON).then(res => {
		let {status} = res;
		return status;
	}).catch(err => {
		console.error(err)
	});
}

function toJSON(res) {
	return res.json();
}

export {send};