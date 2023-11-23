import {Enemy} from "../entities/enemy.js";
import {Tower} from "../defences/tower.js";
import {SpriteManager} from "./spriteManager.js";
import {PhysicsManager} from "./physicsManager.js";

export class GameManager {
	constructor(mapManager, view, context, canvas) {
		this.physicsManager = new PhysicsManager(mapManager, context);
		this.mapManager = mapManager;
		this.spriteManager = new SpriteManager(context);
		this.view = view;
		this.context = context;
		this.canvas = canvas;
		this.health = 100;
		this.enemies = [];
		this.towers = []
		this.enemyCount = 3;
		this.wave = 1;
	}

	async init() {
		this.mapManager.loadLevel('level1');
		await this.mapManager.generateMap('level1');
		this.generateWave(this.mapManager.waypoints, this.enemyCount);
		await this.spriteManager.loadSprites();
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
			enemy.update(this.context);
			if(enemy.position.x > this.canvas.width) {
				this.enemies.splice(i, 1);
				this.health -= 1;

				if(this.health <= 0){
					this.gameOver(updateID);
				}
			}
		}
		if(this.enemies.length === 0){
			this.generateWave(this.mapManager.waypoints, ++this.enemyCount);
			this.wave++;
		}

		this.towers.forEach(tower => {
			tower.update(this.context, this.enemies)
		})
		this.view.updateInfoPanel(this.health, this.wave);
	}

	generateWave(way, countEnemies){
		for(let i = 1; i <= countEnemies; i++){
			const offset = i * 150;
			this.enemies.push(
				new Enemy({
					position: {x: way[0].x - offset, y: way[0].y},
					level: this.getEnemyLevel(),
					health: 100 + this.wave * 10,
					speed: 2 + this.wave * 0.1,
					waypoints: way,
					physics: this.physicsManager,
					sprites: this.spriteManager
				})
			);
		}
	}

	getEnemyLevel(){
		if(this.wave <= 5){
			return 1;
		} else if(this.wave > 5 && this.wave <= 10) {
			return 2;
		}
		return 3;
	}

	generateTower(x, y){
		this.towers.push(new Tower({
			position: {
				x: x,
				y: y
			},
			level: 1,
			physics: this.physicsManager,
			sprites: this.spriteManager
		}))
	}

	gameOver(updateID){
		cancelAnimationFrame(updateID);
		this.view.printGameOver();
	}
}