
export class Enemy {
	constructor({position = {x: 0, y: 0}, waypoints}) {
		this.position = position;
		this.way = waypoints;
		this.wayIndex = 0;
		this.width = 100;
		this.height = 100;

		this.center = {
			x: this.position.x + this.width / 2,
			y: this.position.y + this.height / 2
		}

		// console.log(this.position)
		// console.log(this.way);
		// console.log(this.center);
	}

	draw(context){
		context.fillStyle = 'red';
		context.fillRect(this.position.x, this.position.y,
						 this.width, this.height);
	}

	update(context) {
		this.draw(context);

		const point = this.way[this.wayIndex];
		const yLen = point.y - this.center.y;
		const xLen = point.x - this.center.x;
		const angle = Math.atan2(yLen, xLen);

		this.position.x += Math.cos(angle);
		this.position.y += Math.sin(angle);

		this.center = {
			x: this.position.x + this.width / 2,
			y: this.position.y + this.height / 2
		}

		if (
			Math.round(this.center.x) === Math.round(point.x) &&
			Math.round(this.center.y) === Math.round(point.y) &&
			this.wayIndex < this.way.length - 1
		){
			this.wayIndex++;
		}
	}
}