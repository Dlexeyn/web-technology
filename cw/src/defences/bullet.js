export class Bullet {
	constructor({position = {x: 0, y: 0}, physics, enemy, sprites}) {
		this.position = position;
		this.physics = physics;
		this.sprites = sprites;
		this.enemy = enemy
		this.radius = 10;
		this.speed = 5;
		this.color = 'white'
		this.image = new Image();
		this.image.src = 'assets/images/bullet-1.png';

		this.velocity = {
			x: 0,
			y: 0
		}
	}

	draw(context){
		this.sprites.drawSprite('bullet-1', this.position.x, this.position.y);
		//context.drawImage(this.image, this.position.x, this.position.y, 32, 32);
		// context.beginPath();
		// context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
		//
		// context.fillStyle = this.color;
		// context.fill();
	}

	update(context){
		this.draw(context);

		this.physics.calculateBullet(this, this.enemy);


	}
}