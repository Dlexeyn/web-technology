import {Bullet} from "./bullet.js";

export class Tower {
	constructor({position = {x: 0, y: 0}, physics, enemy, sprites}) {
		this.position = position;
		this.physics = physics;
		this.sprites = sprites;
		this.width = 128;
		this.height = 64;
		this.color = 'blue';
		this.defRadius = 250;
		this.frames = 0;
		this.frequency = 100;
		this.target = null;

		this.center = {
			x: this.position.x + this.width / 2,
			y: this.position.y + this.height / 2,
		}

		this.bullets = [];
	}

	draw(context, enemies){
		context.fillStyle = this.color;
		context.fillRect(this.position.x, this.position.y,
			this.width, 64);

		context.beginPath();
		context.arc(this.center.x, this.center.y, this.defRadius, 0, Math.PI * 2)
		context.fillStyle = 'rgba(0, 0, 255, 0.15)';
		context.fill();


	}

	update(context, enemies){
		this.draw(context, enemies)
		if(this.frames % this.frequency === 0 && this.target){
			this.bullets.push(new Bullet({
				position: {
					x: this.center.x,
					y: this.center.y
				},
				physics: this.physics,
				enemy: this.target,
				sprites: this.sprites
			}))
		}
		this.frames++;
		this.physics.bulletsUpdate(this, enemies);
	}

}