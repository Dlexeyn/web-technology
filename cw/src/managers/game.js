import {Enemy} from "../entities/enemy.js";
import {Tower} from "../defences/tower.js";

export class GameManager {
	constructor(mapManager, physicsManager, view, context, canvas) {
		this.physicsManager = physicsManager;
		this.mapManager = mapManager;
		this.view = view;
		this.context = context;
		this.canvas = canvas;
		this.health = 3;
		this.enemies = [];
		this.towers = []
		this.enemyCount = 3;
	}

	async init() {
		this.mapManager.loadLevel('level1');
		await this.mapManager.generateMap('level1');
		this.generateEntities(this.mapManager.waypoints, this.enemyCount);
	}

	play() {
		this.update();
	}

	update(){
		const updateID = requestAnimationFrame(() => this.update());
		this.mapManager.update();
		this.mapManager.findActiveTile();
		for (let i = this.enemies.length - 1; i >= 0; i--){
			let enemy = this.enemies[i];
			enemy.update(this.context)
			if(enemy.position.x > this.canvas.width) {
				this.enemies.splice(i, 1);
				this.health -= 1;

				if(this.health <= 0){
					this.gameOver(updateID);
				}
			}
		}
		if(this.enemies.length === 0){
			this.generateEntities(this.mapManager.waypoints, ++this.enemyCount);
		}

		this.towers.forEach(tower => {
			tower.update(this.context, this.enemies)
		})
	}

	generateEntities(way, countEnemies){
		for(let i = 1; i <= countEnemies; i++){
			const offset = i * 150;
			this.enemies.push(
				new Enemy({
					position: {x: way[0].x - offset, y: way[0].y},
					waypoints: way,
					physics: this.physicsManager
				})
			);
		}
	}

	generateTower(x, y){
		this.towers.push(new Tower({
			position: {
				x: x,
				y: y
			},
			physics: this.physicsManager
		}))
	}

	gameOver(updateID){
		cancelAnimationFrame(updateID);
		//document.querySelector('#game-over-row').style.display='flex';
		this.view.printGameOver();
	}
}