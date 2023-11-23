
export class Enemy {
	constructor({position = {x: 0, y: 0}, waypoints, physics, sprites}) {
		this.position = position;
		this.way = waypoints;
		this.sprites = sprites;
		this.physics = physics;
		this.wayIndex = 0;
		this.width = 100;
		this.height = 100;
		this.health = 100;
		this.radius = 50;
		this.speed = 2;

		this.frames = {
			current: 0,
			elapsed: 0,
			hold: 5,
			max: 7
		}

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

		this.sprites.drawSprite(`ork-2-walk-${this.frames.current}`, this.position.x, this.position.y);

		this.frames.elapsed++;
		if(this.frames.elapsed % this.frames.hold === 0){
			this.frames.current++;
			if (this.frames.current >= this.frames.max - 1){
				this.frames.current = 0
			}
		}
		// context.fillStyle = 'red';
		// context.beginPath();
		// context.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
		// context.fill();
		//
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