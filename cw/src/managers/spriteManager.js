export class SpriteManager {
	constructor(context) {
		this.context = context;
		this.sprites = [];
	}

	drawSprite(objectName, x, y){
		const sprite = this.sprites[objectName];
		if(sprite){
			this.context.drawImage(sprite.image, x, y, sprite.w, sprite.h);
		}

	}

	async loadSprites() {
		await this.xmlHttpRequest()
			.then((res) => {
				this.readMapData(res.spritesData);
			}).catch(err => {
				console.error(err);
			});
	}

	xmlHttpRequest = async function() {
		return new Promise(function(resolve, reject) {
			let xhr = new XMLHttpRequest();
			xhr.open("GET", `./assets/sprites.json`, true);
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

	readMapData(spritesData) {
		for (const itemData of spritesData){
			let sprite = {};
			sprite.w = itemData.w;
			sprite.h = itemData.h;
			sprite.image = new Image();
			sprite.image.src = itemData.img;
			this.sprites[itemData.name] = sprite;
		}
		console.log(this.sprites);
	}
}

