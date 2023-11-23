
export class Enemy {
	constructor({position = {x: 0, y: 0}, level, health, speed, waypoints, physics, sprites}) {
		this.position = position;
		this.way = waypoints;
		this.sprites = sprites;
		this.physics = physics;
		this.wayIndex = 0;
		this.width = 100;
		this.height = 100;
		this.radius = 50;
		this.health = health;
		this.maxHealth = health;
		this.level = level;
		this.speed = speed;

		this.frames = {
			current: 0,
			elapsed: 0,
			hold: 5,
			max: 6
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
		this.sprites.drawSprite(`ork-${this.level}-walk-${this.frames.current}`,
			this.position.x, this.position.y);

		this.sprites.spriteArrayUpdate(this.frames);

		context.fillStyle = 'red';
		context.fillRect(this.position.x, this.position.y - 15,
						 this.width, 10);

		context.fillStyle = 'green';
		context.fillRect(this.position.x, this.position.y - 15,
			this.width / this.maxHealth * this.health, 10);
	}

	update(context) {
		this.draw(context);
		this.physics.calculateEnemy(this);
	}
}