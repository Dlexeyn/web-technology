
export class DefenceTile {
	constructor({position = {x: 0, y: 0}, waypoints}) {
		this.position = position;
		this.size = 64;
	}

	draw(context){
		context.fillStyle = 'red';
		context.fillRect(this.position.x, this.position.y,
			64, 64);
	}
}