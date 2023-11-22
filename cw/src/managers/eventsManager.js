export class EventsManager{
	constructor(canvas, mapManager, gameManager) {
		this.canvas = canvas;
		this.gameManager = gameManager;
		this.mapManager = mapManager;
		canvas.addEventListener('click', event => this.clickHandler(event))
	}

	clickHandler(event){
		if(this.mapManager.activeTile && !this.mapManager.activeTile.isUsed){
			this.gameManager.generateTower(
				this.mapManager.activeTile.position.x,
				this.mapManager.activeTile.position.y
			);
		}
	}
}