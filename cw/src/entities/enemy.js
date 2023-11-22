
export class Enemy {
	constructor({position = {x: 0, y: 0}, waypoints, physics}) {
		this.position = position;
		this.way = waypoints;
		this.physics = physics;
		this.wayIndex = 0;
		this.width = 100;
		this.height = 100;
		this.radius = 50;
		this.health = 100;
		this.speed = 6;

		this.center = {
			x: this.position.x + this.width / 2,
			y: this.position.y + this.height / 2
		}

		this.velocity = {
			x: 0,
			y: 0
		}
	}

	draw(context){
		context.fillStyle = 'red';
		context.beginPath();
		context.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
		context.fill();

		context.fillStyle = 'red';
		context.fillRect(this.position.x, this.position.y - 15,
						 this.width, 10);

		context.fillStyle = 'green';
		context.fillRect(this.position.x, this.position.y - 15,
			this.width * this.health / 100, 10);
	}

	update(context) {
		this.draw(context);
		this.physics.calculateEnemy(this);
	}
}