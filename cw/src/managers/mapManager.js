import {Enemy} from "../entities/enemy.js";
import {DefenceTile} from "../defences/defenceTile.js";
import {Ballista} from "../defences/ballista.js";

export class MapManager {
	waypoints;
	constructor(context, mouse) {
		this.context = context;
		this.mapImage = new Image();
		this.waypoints = [];
		this.placement = [];
		this.height = 0;
		this.width = 0;
		this.mouse = mouse;
		this.activeTile = undefined;
	}
	loadLevel(level){
		this.mapImage.src = `./assets/levels/${level}.png`
	}

	update(){
		this.context.drawImage(this.mapImage, 0, 0);
		for (let place of this.placement){
			place.update(this.context, this.mouse);
		}
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
		let placementTiles2D = [];
		for (let i = 0; i < placementTilesArray.length; i += this.width){
			placementTiles2D.push(placementTilesArray.slice(i, i + this.width));
		}

		placementTiles2D.forEach((row, y) => {
			row.forEach((item, x) => {
				if(item === 14 || item === 716){
					this.placement.push(
						new DefenceTile({
							position: {
								x: x * 64,
								y: y * 64
							}
						})
					)
				}
			})
		})
	}

	findActiveTile(){
		this.activeTile = null;
		for (let i = 0; i < this.placement.length; i++)
		{
			let curTile = this.placement[i];
			if(
				this.mouse.x > curTile.position.x &&
				this.mouse.x < curTile.position.x + curTile.size &&
				this.mouse.y > curTile.position.y &&
				this.mouse.y < curTile.position.y + curTile.size
			) {
				this.activeTile = curTile;
				break
			}
		}
	}

}







