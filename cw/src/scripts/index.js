import {MapManager} from "../managers/mapManager.js";
import {GameManager} from "../managers/game.js";

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1280;
canvas.height = 768;

context.fillStyle = 'white';
context.fillRect(0, 0, canvas.width, canvas.height);

const mapManager = new MapManager(context);

const game = new GameManager(mapManager, context);
game.init().then(r => game.play());



