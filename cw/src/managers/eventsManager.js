const SPACE = 32;

export class EventsManager{
	constructor(canvas, mapManager, gameManager) {
		this.canvas = canvas;
		this.gameManager = gameManager;
		this.mapManager = mapManager;
		this.counter = 0;
		this.buildingType = '';

		this.hTimer = 120 * 1000;
		this.mTimer = 80 * 1000;

		this.restoreHTimer = 0;
		this.restoreMTimer = 0;

		this.clicked = () => {
			this.counter++;
			console.log(this.mapManager.activeTile);
			if(this.mapManager.activeTile && !this.mapManager.activeTile.isUsed){
				this.mapManager.activeTile.isUsed = true;
				this.gameManager.generateBuilding(
					this.buildingType,
					this.mapManager.activeTile.position.x,
					this.mapManager.activeTile.position.y
				);
			}
			if (this.counter >= 1){
				console.log(this.counter);
				this.remove();
			}
		}
		this.clickHandler = this.clicked.bind(this);

		this.canvas.addEventListener('click', ()=>{
			console.log('click');
		})

		document.querySelector('#exit').style.display = 'none';

		document.addEventListener('keydown', this.handleKeyDown.bind(this));

		document.getElementById('add-tower')
			.addEventListener('click', event => this.addTowerHandler(event));

		document.getElementById('add-ballista')
			.addEventListener('click', event => this.addBallistaHandler(event));

		document.getElementById('add-health')
			.addEventListener('click', event => this.addHealthHandler(event));

		document.getElementById('add-money')
			.addEventListener('click', event => this.addMoneyHandler(event));

		document.getElementById('exit')
			.addEventListener('click', event => this.exitToMenuHandler(event));

		this.showTimer(this.hTimer, 'add-health');
		this.showTimer(this.mTimer, 'add-money');
	}

	// saveTimers(){
	// 	this.restoreHTimer =
	// }

	addTowerHandler(event) {
		console.log('addTower')
		this.buildingType = 'tower';
		this.canvas.addEventListener('click', this.clickHandler)
	}

	addBallistaHandler(event){
		console.log('addBallista')
		this.buildingType = 'ballista';
		this.canvas.addEventListener('click', this.clickHandler)
	}

	addHealthHandler(event){
		let value = document.getElementById('add-health').innerHTML;
		if(value === '+'){
			this.gameManager.health++;
			this.hTimer *= 2;
			this.showTimer(this.hTimer, 'add-health');
		}
	}

	addMoneyHandler(event){
		let value = document.getElementById('add-money').innerHTML;
		if(value === '+'){
			this.gameManager.money += 100;
			this.mTimer *= 2;
			this.showTimer(this.mTimer, 'add-money');
		}
	}

	showTimer(timerCount, id){
		let timer;
		let x = timerCount / 1000;
		countdown();

		function countdown(){
			document.getElementById(id).innerHTML = x;
			if(document.querySelector('#exit').style.display === 'none'){
				x--;
			}
			console.log();
			if (x < 0){
				clearTimeout(timer);
				document.getElementById(id).innerHTML = "+";
			} else {
				timer = setTimeout(() => countdown(), 1000);
			}
		}
	}

	exitToMenuHandler(event) {
		window.location.href = "./index.html";
	}

	remove() {
		this.canvas.removeEventListener('click', this.clickHandler);
		this.counter = 0;
	}

	handleKeyDown(event){
		if (event.keyCode === SPACE){
			this.gameManager.pause();
		}
	}

}