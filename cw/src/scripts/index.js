import {MapManager} from "../managers/mapManager.js";
import {GameManager} from "../managers/game.js";
import {EventsManager} from "../managers/eventsManager.js";
import {PhysicsManager} from "../managers/physicsManager.js";
import {ViewManager} from "../managers/viewManager.js";
import {SpriteManager} from "../managers/spriteManager.js";

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1280;
canvas.height = 768;

context.fillStyle = 'white';
context.fillRect(0, 0, canvas.width, canvas.height);

const level = localStorage.getItem('load');

const mouse = {};
const viewManager = new ViewManager(canvas.width, canvas.height, context);
const mapManager = new MapManager(context, mouse);
const game = new GameManager(mapManager, viewManager, context, canvas, level);
const eventManager = new EventsManager(canvas, mapManager, game);
game.init().then(r => game.play());

window.addEventListener('mousemove', (event) => {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
})

