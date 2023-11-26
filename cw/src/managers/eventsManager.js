export class EventsManager{
	constructor(canvas, mapManager, gameManager) {
		this.canvas = canvas;
		this.gameManager = gameManager;
		this.mapManager = mapManager;
		this.counter = 0;
		this.buildingType = '';

		this.clicked = () => {
			this.counter++;
			console.log(this.buildingType);
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

		document.getElementById('add-tower')
			.addEventListener('click', event => this.addTowerHandler(event));

		document.getElementById('add-ballista')
			.addEventListener('click', event => this.addBallistaHandler(event))
	}

	addTowerHandler(event) {
		this.buildingType = 'tower';
		this.canvas.addEventListener('click', this.clickHandler)
	}

	addBallistaHandler(event){
		this.buildingType = 'ballista';
		this.canvas.addEventListener('click', this.clickHandler)
	}


	remove() {
		console.log('remove');
		this.canvas.removeEventListener('click', this.clickHandler);
		this.counter = 0;
	}
}