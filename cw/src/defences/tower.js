import {Bullet} from "./bullet.js";

export class Tower {
	constructor({position = {x: 0, y: 0}}) {
		this.position = position;
		this.width = 128;
		this.height = 64;
		this.color = 'blue';

		this.center = {
			x: this.position.x + this.width / 2,
			y: this.position.y + this.height / 2,
		}

		this.bullets = [new Bullet({
			position: {
				x: this.center.x,
				y: this.center.y
			}
		})]
	}

	draw(context, enemy){
		context.fillStyle = this.color;
		context.fillRect(this.position.x, this.position.y,
			this.width, 64);

		this.bullets.forEach((bullet, i) => {
			bullet.update(context, enemy);

			const dX = enemy.center.x - bullet.position.x;
			const dY = enemy.center.y - bullet.position.y;
			const distance = Math.hypot(dX, dY);

			if (distance < bullet.radius + enemy.radius){

			}
		});

	}

}