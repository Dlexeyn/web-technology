export class Bullet {
	constructor({position = {x: 0, y: 0}, physics = null, enemy}) {
		this.position = position;
		this.physics = physics;
		this.enemy = enemy
		this.radius = 10;
		this.speed = 5;
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

	update(context){
		this.draw(context);

		this.physics.calculateBullet(this, this.enemy);


	}
}