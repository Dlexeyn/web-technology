const MAX_RECORDS = 8;

export class ViewManager {
	constructor(width, height, context) {
		this.width = width;
		this.height = height;
		this.context = context;
		this.MIDDLE_POS = this.width / 2;
	}

	updateInfoPanel(hearts, wave, money){
		document.querySelector('#heart-value').innerHTML = hearts;
		document.querySelector('#wave-value').innerHTML = wave;
		document.querySelector('#money-value').innerHTML = money;
	}

	setStyle(color, font, textAlign, textBaseLine){
		this.context.fillStyle = color;
		this.context.font = font;
		this.context.textAlign = textAlign;
		this.context.textBaseline = textBaseLine;
	}

	printEnd(status, username, score){
		let stepPX = 48;
		let n = 1;
		this.hidePanels();
		this.context.fillStyle = 'rgba(0,0,0,0.7)';
		this.context.fillRect(0, 0, this.width, this.height);
		this.setStyle('#f38319',
			"bold 30px Righteous",
			'center',
			'middle');
		this.context.fillText(status, this.width / 2, stepPX);
		this.context.fillText(`Счёт: ${score}`, this.MIDDLE_POS, stepPX * ++n);
		this.printRecordTable(48, n, username);
	}

	printRecordTable(stepPX, n, player){
		this.context.fillText(`Таблица рекордов:`, this.MIDDLE_POS, stepPX * ++n);
		this.setStyle('#ffffff',
			"bold 26px Righteous",
			'start',
			'middle');
		let records = [];

		for(let i = 0; i < localStorage.length % MAX_RECORDS; i++){
			let name = localStorage.key(i);
			if(name === 'null')
				continue;
			let score = localStorage.getItem(name);
			records.push({name, score});
		}
		records.sort((a, b) =>{
			return parseInt(b.score) - parseInt(a.score);
		});

		records.forEach((record) => {
			let offset = record.name.length + stepPX * 2;
			if (record.name === player){
				this.context.fillStyle = 'red';
			}
			this.context.fillText(record.name, this.MIDDLE_POS - offset, stepPX * ++n);
			this.context.fillText(record.score, this.MIDDLE_POS + offset, stepPX * n);
			this.context.fillStyle = '#ffffff';
		})
	}

	hidePanels(){
		document.querySelector('#buttons-panel').style.display = 'none';
		document.querySelector('#info-panel').style.display = 'none';
	}
}

