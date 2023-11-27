import {Enemy} from "../entities/enemy.js";
import {Ballista} from "../defences/ballista.js";
import {SpriteManager} from "./spriteManager.js";
import {PhysicsManager} from "./physicsManager.js";
import {Tower} from "../defences/tower.js";
import {SoundManager} from "./soundManager.js";

export class GameManager {
	constructor(mapManager, view, context, canvas, level) {
		this.physicsManager = new PhysicsManager(this, context);
		this.mapManager = mapManager;
		this.spriteManager = new SpriteManager(context);
		this.soundManager = new SoundManager();
		this.level = level;
		this.updateID = 0;
		this.view = view;
		this.context = context;
		this.canvas = canvas;
		this.health = 5;
		this.enemies = [];
		this.towers = []
		this.enemyCount = 3;
		this.wave = 1;
		this.money = 200;
		this.isPause = false;
	}

	async init() {
		this.mapManager.loadLevel(this.level);
		await this.mapManager.generateMap(this.level);
		this.soundManager.init();
		this.generateWave(this.mapManager.waypoints, this.enemyCount);
		await this.spriteManager.loadSprites();
	}

	play() {
		this.update();
		this.soundManager.play('assets/music/aliens-run.mp3', {looping: true});
	}

	pause(){
		if(!this.isPause){
			cancelAnimationFrame(this.updateID);
			this.view.printPause();
			this.soundManager.toggleMute();
			this.view.showPauseMenu();
		} else {
			this.view.showPanels();
			this.soundManager.toggleMute();
			this.view.hidePauseMenu();
			this.update();
		}
		this.isPause = !this.isPause;
	}

	endGame(endStatus){
		cancelAnimationFrame(this.updateID);
		this.towers = [];
		const username = localStorage.getItem('username');
		localStorage.removeItem('username');
		const score = this.calculateScore();
		localStorage.setItem(username, score + '');
		this.view.showPauseMenu();
		this.view.printEnd(endStatus, username, score);
	}

	update(){
		this.updateID = requestAnimationFrame(() => this.update());
		this.mapManager.update();
		this.mapManager.findActiveTile();
		for (let i = this.enemies.length - 1; i >= 0; i--){
			let enemy = this.enemies[i];
			enemy.update(this.context);
			if(enemy.position.x > this.canvas.width) {
				this.enemies.splice(i, 1);
				this.health -= 1;

				if(this.health <= 0){
					this.soundManager.stopAll();
					this.soundManager.play('assets/music/game-over.mp3');
					this.endGame("Поражение");
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
		this.view.updateInfoPanel(this.health, this.wave, this.money);
		this.view.updateLeftPanel(
			localStorage.getItem('username'),
			this.calculateScore(),
			this.level
		);

		if (this.wave === 15){
			this.soundManager.stopAll();
			this.soundManager.play('assets/music/victory.mp3');
			this.endGame("Победа");
		}
	}

	generateWave(way, countEnemies){
		for(let i = 1; i <= countEnemies; i++){
			const offset = i * 150;
			this.enemies.push(
				new Enemy({
					position: {x: way[0].x - offset, y: way[0].y},
					level: this.getEnemyLevel(),
					health: 100 + this.wave * 20,
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

	generateBuilding(type, x, y){
		const purchase = this.purchaseProcessing(type);
		if(purchase && type === 'tower'){
			this.towers.push(new Tower({
				position: {
					x: x,
					y: y
				},
				level: 1,
				physics: this.physicsManager,
				sprites: this.spriteManager
			}))
		} else if(purchase && type === 'ballista'){
			this.towers.push(new Ballista({
				position: {
					x: x,
					y: y
				},
				level: 1,
				physics: this.physicsManager,
				sprites: this.spriteManager
			}))
		}
		this.towers.sort((a, b) => {
			return a.position.y - b.position.y;
		})
	}

	purchaseProcessing(type){
		if(type === 'tower' && this.money >= 80){
			this.money -= 80;
			return true;
		} else if(type === 'ballista' && this.money >= 120){
			this.money -= 120;
			return true;
		}

		return false;
	}

	addMoney(){
		if(this.wave <= 5){
			this.money += 10;
		} else if(this.wave > 5 && this.wave <= 10) {
			this.money += 5;
		} else {
			this.money += 1;
		}
	}

	calculateScore() {
		if (this.wave === 1)
			return 0;
		return (this.money * 2 + this.wave * 10) * this.health;
	}
}