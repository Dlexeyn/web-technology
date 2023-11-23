export class Bullet {
	constructor({position = {x: 0, y: 0}, physics, enemy, sprites}) {
		this.position = position;
		this.physics = physics;
		this.sprites = sprites;
		this.enemy = enemy
		this.radius = 10;
		this.speed = 10;
		this.color = 'white'
		this.image = new Image();
		this.image.src = 'assets/images/bullet-2.png';

		this.velocity = {
			x: 0,
			y: 0
		}
	}

	draw(context){
		this.sprites.drawSprite('bullet-2', this.position.x, this.position.y - 64);
	}

	update(context){
		this.draw(context);

		this.physics.calculateBullet(this, this.enemy);


	}
}