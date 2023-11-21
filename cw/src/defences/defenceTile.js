
export class DefenceTile {
	constructor({position = {x: 0, y: 0}, waypoints}) {
		this.position = position;
		this.size = 64;
		this.color = 'rgba(255, 255, 255, 0.15)';
		this.isUsed = false;
	}

	draw(context){
		context.fillStyle = this.color;
		context.fillRect(this.position.x, this.position.y,
			64, 64);
	}

	update(context, mouse){
		this.draw(context);
		if(
			mouse.x > this.position.x &&
			mouse.x < this.position.x + this.size &&
			mouse.y > this.position.y &&
			mouse.y < this.position.y + this.size
		) {
			this.color = 'green';
		} else {
			this.color = 'rgba(255, 255, 255, 0.15)';
		}
	}
}