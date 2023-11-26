import {Bullet} from "./bullet.js";

export class Ballista {
	constructor({position = {x: 0, y: 0}, level, physics, enemy, sprites}) {
		this.position = position;
		this.physics = physics;
		this.sprites = sprites;
		this.level = level;
		this.width = 128;
		this.height = 64;
		this.color = 'blue';
		this.defRadius = 375;
		this.damage = 70;
		this.frames = {
			max: 19,
			current: 0,
			elapsed: 0,
			hold: 9
		}
		this.target = null;

		this.center = {
			x: this.position.x + this.width / 2,
			y: this.position.y,
		}

		this.bullets = [];
	}

	draw(context, enemies){
		this.sprites.drawSprite(`ballista-1-${this.frames.current}`,
			this.position.x, this.position.y - 64);
	}

	update(context, enemies){
		this.draw(context, enemies);

		if (this.target || (!this.target && this.frames.current !== 0)){
			this.sprites.spriteArrayUpdate(this.frames);
		}

		if(this.frames.elapsed % this.frames.hold === 0 && this.frames.current === 6 && this.target){
			this.bullets.push(new Bullet({
				position: {
					x: this.center.x,
					y: this.center.y
				},
				type: 1,
				physics: this.physics,
				enemy: this.target,
				sprites: this.sprites
			}))
		}
		this.physics.bulletsUpdate(this, enemies);
	}

}