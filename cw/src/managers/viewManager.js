export class ViewManager {
	constructor(width, height, context) {
		this.width = width;
		this.height = height;
		this.middle_pos_x = this.width / 2;
		this.context = context;
	}

	printGameOver(){
		this.context.fillStyle = 'rgba(0,0,0,0.7)';
		this.context.fillRect(0, 0, this.width, this.height);
		this.setStyle('#f38319',
			"bold 30px Righteous",
			'center',
			'middle');
		this.context.fillText('Game Over', this.width / 2, this.height / 2);
	}

	setStyle(color, font, textAlign, textBaseLine){
		this.context.fillStyle = color;
		this.context.font = font;
		this.context.textAlign = textAlign;
		this.context.textBaseline = textBaseLine;
	}
}

