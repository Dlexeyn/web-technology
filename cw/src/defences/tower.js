import {Bullet} from "./bullet.js";

export class Tower {
	constructor({position = {x: 0, y: 0}, level, physics, enemy, sprites}) {
		this.position = position;
		this.physics = physics;
		this.sprites = sprites;
		this.level = level;
		this.width = 128;
		this.height = 128;
		this.defRadius = 250;
		this.damage = 15;
		this.frames = {
			max: 6,
			current: 0,
			elapsed: 0,
			hold: 3
		}
		this.target = null;

		this.center = {
			x: this.position.x + this.width / 2,
			y: this.position.y,
		}

		this.bullets = [];
	}

	draw(context, enemies){
		this.sprites.drawSprite(`tower-1-${this.frames.current}`,
			this.position.x, this.position.y - 128);

		// context.beginPath();
		// context.arc(this.center.x, this.center.y, this.defRadius, 0, Math.PI * 2)
		// context.fillStyle = 'rgba(0, 0, 255, 0.15)';
		// context.fill();
	}

	update(context, enemies){
		this.draw(context, enemies);

		if (this.target || (!this.target && this.frames.current !== 0)){
			this.sprites.spriteArrayUpdate(this.frames);
		}

		if(this.frames.elapsed % this.frames.hold === 0 && this.frames.current === 5 && this.target){
			this.bullets.push(new Bullet({
				position: {
					x: this.center.x,
					y: this.center.y
				},
				type: 2,
				physics: this.physics,
				enemy: this.target,
				sprites: this.sprites
			}))
		}
		this.physics.bulletsUpdate(this, enemies);
	}
}