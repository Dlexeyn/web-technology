import {Enemy} from "../entities/enemy.js";

export class GameManager {
	constructor(mapManager, context) {
		this.mapManager = mapManager;
		this.context = context;
	}

	async init() {
		this.mapManager.loadLevel('level1');
		await this.mapManager.generateMap('level1');
		this.mapManager.generateEntities();
	}

	play() {
		this.mapManager.animate();
	}
}