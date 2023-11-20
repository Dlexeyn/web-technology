import {Enemy} from "../entities/enemy.js";

export class MapManager {
	waypoints;
	constructor(context) {
		this.context = context;
		this.mapImage = new Image();
		this.waypoints = [];
		this.placement = [];
		this.enemies = [];
		this.height = 0;
		this.width = 0;

		// this.mapImage.onload = () => {
		// 	this.animate();
		// }
	}
	loadLevel(level){
		this.mapImage.src = `./assets/levels/${level}.png`
	}

	async generateMap(level){
		await this.xmlHttpRequest(level)
			.then((res) => {
				this.waypoints = res.waypoints;
				this.width = res.width;
				this.height = res.height;
				this.placementTilesTo2D(res.placement);
			}).catch(err => {
			console.error(err);
		});
	}

	xmlHttpRequest = async function(level) {
		return new Promise(function(resolve, reject) {
			let xhr = new XMLHttpRequest();
			xhr.open("GET", `./assets/levels/${level}_tiles.json`, true);
			let text='empty';
			xhr.onreadystatechange = function() {
				if (this.readyState === 4) {
					if (this.status >= 200 && this.status < 400) {
						const answer = JSON.parse(this.responseText);
						resolve(answer);
					} else {
						reject(new Error('Error'));
					}
				}
			};
			xhr.send();
		});
	};

	placementTilesTo2D(placementTilesArray){
		for (let i = 0; i < placementTilesArray.length; i += this.width){
			this.placement.push(placementTilesArray.slice(i, i + this.width));
		}

		this.placement.forEach(row => {
			row.forEach(item => {
				if(item === 14){
					// print tile
				}
			})
		})
		console.log(this.placement);
	}

	generateEntities(){
		for(let i = 1; i <= 10; i++){
			const offset = i * 150;
			this.enemies.push(
				new Enemy({
					position: {x: this.waypoints[0].x - offset, y: this.waypoints[0].y},
					waypoints: this.waypoints
				})
			);
		}
	}

	animate(){
		requestAnimationFrame(() => this.animate());
		this.context.drawImage(this.mapImage, 0, 0);
		this.enemies.forEach(enemy => enemy.update(this.context))
	}

}



