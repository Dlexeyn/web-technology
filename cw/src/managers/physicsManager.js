export class PhysicsManager{
	constructor(mapManager, context) {
		this.mapManager = mapManager;
		this.context = context;
	}

	bulletsUpdate(tower, enemies){
		tower.target = null;
		const validEnemies = enemies.filter(enemy => {
			const dX = enemy.center.x - tower.position.x;
			const dY = enemy.center.y - tower.position.y;
			const distance = Math.hypot(dX, dY);
			return distance < enemy.radius + tower.defRadius;
		})
		tower.target = validEnemies[0];

		for (let i = tower.bullets.length - 1; i >= 0; i--){
			let bullet = tower.bullets[i];
			bullet.update(this.context);
			const dX = bullet.enemy.center.x - bullet.position.x;
			const dY = bullet.enemy.center.y - bullet.position.y;
			const distance = Math.hypot(dX, dY);

			if (distance < bullet.radius + bullet.enemy.radius){
				bullet.enemy.health -= 20;
				if(bullet.enemy.health <= 0){
					this.destroyEnemy(bullet.enemy, enemies);
				}
				tower.bullets.splice(i, 1);
			}
		}
	}

	calculateBullet(bullet, enemy){
		const angle = Math.atan2(
			enemy.center.y - bullet.position.y,
			enemy.center.x - bullet.position.x
		);
		const factor = 4;
		bullet.velocity.x = Math.cos(angle) * factor;
		bullet.velocity.y = Math.sin(angle) * factor;

		bullet.position.x += bullet.velocity.x;
		bullet.position.y += bullet.velocity.y;
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