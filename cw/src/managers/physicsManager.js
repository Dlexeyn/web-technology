export class PhysicsManager{
	constructor(game, context) {
		this.context = context;
		this.game = game;
	}

	bulletsUpdate(defenceBuilding, enemies){
		defenceBuilding.target = null;
		const validEnemies = enemies.filter(enemy => {
			const dX = enemy.center.x - defenceBuilding.center.x;
			const dY = enemy.center.y - defenceBuilding.center.y;
			const distance = Math.hypot(dX, dY);
			return distance < enemy.radius + defenceBuilding.defRadius;
		})
		defenceBuilding.target = validEnemies[0];

		for (let i = defenceBuilding.bullets.length - 1; i >= 0; i--){
			let bullet = defenceBuilding.bullets[i];
			bullet.update(this.context);
			const dX = bullet.enemy.center.x - bullet.position.x;
			const dY = bullet.enemy.center.y - bullet.position.y;
			const distance = Math.hypot(dX, dY);

			if (distance < bullet.radius + bullet.enemy.radius){
				bullet.enemy.health -= defenceBuilding.damage;
				if(bullet.enemy.health <= 0){
					this.destroyEnemy(bullet.enemy, enemies);
					this.game.addMoney();
				}
				defenceBuilding.bullets.splice(i, 1);
			}
		}
	}

	calculateBullet(bullet, enemy){
		const angle = Math.atan2(
			enemy.center.y - bullet.position.y,
			enemy.center.x - bullet.position.x
		);
		bullet.velocity.x = Math.cos(angle) * bullet.speed;
		bullet.velocity.y = Math.sin(angle) * bullet.speed;

		bullet.position.x += bullet.velocity.x;
		bullet.position.y += bullet.velocity.y;
	}
	
	calculateEnemy(enemy){
		const point = enemy.way[enemy.wayIndex];
		const yLen = point.y - enemy.center.y;
		const xLen = point.x - enemy.center.x;
		const angle = Math.atan2(yLen, xLen);

		enemy.velocity.x = Math.cos(angle)
		enemy.velocity.y = Math.sin(angle);

		enemy.position.x += enemy.velocity.x * enemy.speed;
		enemy.position.y += enemy.velocity.y * enemy.speed;

		enemy.center = {
			x: enemy.position.x + enemy.width / 2,
			y: enemy.position.y + enemy.height / 2
		}

		if (
			Math.abs(Math.round(enemy.center.x) - Math.round(point.x)) < Math.abs(enemy.velocity.x * enemy.speed) &&
			Math.abs(Math.round(enemy.center.y) - Math.round(point.y)) < Math.abs(enemy.velocity.y * enemy.speed) &&
			enemy.wayIndex < enemy.way.length - 1
		){
			enemy.wayIndex++;
		}
	}

	destroyEnemy(enemy, enemies) {
		const index = enemies.findIndex((item) => {
			return item === enemy;
		})
		if(index !== -1){
			enemies.splice(index, 1);
		}
	}
}