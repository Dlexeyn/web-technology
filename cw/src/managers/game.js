import {Enemy} from "../entities/enemy.js";
import {Tower} from "../defences/tower.js";

export class GameManager {
	constructor(mapManager, physicsManager, context) {
		this.physicsManager = physicsManager;
		this.mapManager = mapManager;
		this.context = context;
		this.enemies = [];
		this.towers = []
	}

	async init() {
		this.mapManager.loadLevel('level1');
		await this.mapManager.generateMap('level1');
		//this.mapManager.generateEntities();
		this.generateEntities(this.mapManager.waypoints);
	}

	play() {
		this.update();
	}

	update(){
		requestAnimationFrame(() => this.update());
		this.mapManager.update();
		this.mapManager.findActiveTile();
		this.enemies.forEach(enemy => enemy.update(this.context))
		this.towers.forEach(tower => {
			tower.update(this.context, this.enemies)
		})
	}

	generateEntities(way){
		for(let i = 1; i <= 10; i++){
			const offset = i * 150;
			this.enemies.push(
				new Enemy({
					position: {x: way[0].x - offset, y: way[0].y},
					waypoints: way
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
}