
export class EventsManager{
	constructor(canvas, mapManager) {
		this.canvas = canvas;
		this.mapManager = mapManager;

		canvas.addEventListener('click', event => this.clickHandler(event))
	}

	clickHandler(event){
		// console.log(event)
		// console.log('click');
		// console.log(this.mapManager)
		if(this.mapManager.activeTile && !this.mapManager.activeTile.isUsed){
			this.mapManager.createTower();
		}
	}
}