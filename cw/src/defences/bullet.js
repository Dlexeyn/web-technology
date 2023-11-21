export class Bullet {
	constructor({position = {x: 0, y: 0}}) {
		this.position = position;
		this.radius = 10;
		this.color = 'white'

		this.velocity = {
			x: 0,
			y: 0
		}
	}

	draw(context){
		context.beginPath();
		context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)

		context.fillStyle = this.color;
		context.fill();
	}

	update(context, enemy){
		this.draw(context);

		const angle = Math.atan2(
			enemy.center.y - this.position.y,
			enemy.center.x - this.position.x
		);
		this.velocity.x = Math.cos(angle);
		this.velocity.y = Math.sin(angle);

		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
	}
}