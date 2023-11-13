import FigureColor from "./figureColor.js";

const MAX_RECORDS = 8;

export default class View{
    constructor(element, width, height, rows, columns){
        this.element = element;
        this.width = width;
        this.height = height;
        this.MIDDLE_POS = this.width / 2;

        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = this.canvas.getContext('2d');

        this.fieldBorderWidth = 4;
        this.fieldX = 4;
        this.fieldY = 4;

        // 640px * 1/2 = 320px
        // и учитываем рамку с двух сторон по ширине и высоте
        this.fieldInnerWidth = this.width * 1 / 2 - this.fieldBorderWidth * 2;
        this.fieldInnerHeight = this.height - this.fieldBorderWidth * 2;

        this.cellWidth = this.fieldInnerWidth / columns;
        this.cellHeight = this.fieldInnerHeight / rows;
        this.figureColor = new FigureColor();

        this.statusX = this.fieldInnerWidth + 20;
        this.statusY = this.fieldY;

        this.element.appendChild(this.canvas);
    }

    clearScreen(){
        this.context.clearRect(0, 0, this.width, this.height);
    }

    setStyle(color, font, textAlign, textBaseLine){
        this.context.fillStyle = color;
        this.context.font = font;
        this.context.textAlign = textAlign;
        this.context.textBaseline = textBaseLine;
    }

    paintPause(){
        this.context.fillStyle = 'rgba(0,0,0,0.7)';
        this.context.fillRect(0, 0, this.width, this.height);
        this.setStyle('#f38319',
            "bold 30px Righteous",
            'center',
            'middle');
        this.context.fillText('Pause', this.MIDDLE_POS, this.height / 2);
    }

    paintGameOverScreen(score){
        let stepPX = 48;
        let n = 1;
        this.clearScreen();
        this.context.fillStyle = 'rgba(0,0,0,0)';
        this.context.fillRect(0, 0, this.width, this.height);

        this.setStyle('#f38319',
            "bold 32px Righteous",
            'center',
            'middle');

        this.context.fillText('Игра окончена', this.MIDDLE_POS, stepPX);
        this.context.fillText(`Счёт: ${score}`, this.MIDDLE_POS, stepPX * ++n);

        this.context.save();

        this.printRecordTable(stepPX, n);

        this.context.restore();

        this.context.fillText(`Нажмите enter, чтобы перезапустить`, this.MIDDLE_POS,
            this.height / 2 + stepPX * n);
    }

    printRecordTable(stepPX, n){
        this.context.fillText(`Таблица рекордов:`, this.MIDDLE_POS, stepPX * ++n);
        this.setStyle('#ffffff',
            "bold 26px Righteous",
            'start',
            'middle');
        let records = [];

        for(let i = 0; i < localStorage.length % MAX_RECORDS; i++){
            let name = localStorage.key(i);
            if(name === 'null')
                continue;
            let score = localStorage.getItem(name);
            records.push({name, score});
        }
        records.sort((a, b) =>{
            return parseInt(b.score) - parseInt(a.score);
        });

        records.forEach((record) => {
            let offset = record.name.length + stepPX * 2;
            this.context.fillText(record.name, this.MIDDLE_POS - offset, stepPX * ++n);
            this.context.fillText(record.score, this.MIDDLE_POS + offset, stepPX * n);
        })

    }

    paintField(gameState){
        const {score, level, player, nextFigureBlocks: nextFigure, isGameOver, stateField} = gameState;
        this.clearScreen();

        this.context.fillStyle = '#f38319';
        this.context.fillRect(0, 0, this.width * 1/2, this.height);
        this.context.clearRect(this.fieldX, this.fieldY,
            this.fieldInnerWidth,
            this.fieldInnerHeight);

        this.paintStatusPanel(player, level, score, nextFigure);

        for(let y = 0; y < stateField.length; y++){
            for(let x = 0; x < stateField[y].length; x++){
                if(stateField[y][x]){
                    this.paintCell(
                        this.fieldX,
                        this.fieldY,
                        x,
                        y,
                        this.figureColor.colors[stateField[y][x] + '']
                    );
                }
            }
        }
    }

    paintStatusPanel(player, level, score, nextFigure){
        let step = 20;
        const X = this.statusX;
        const Y = this.statusY

        this.setStyle('#f38319',
            "bold 18px Righteous",
            'start',
            'top');

        this.context.fillText(`Игрок: ${player}`, X, Y);
        this.context.fillText(`Текущий уровень: ${level}`, X, Y + step);
        this.context.fillText(`Очки: ${score}`, X, Y + step * 2);
        this.context.fillText(`Следующая фигура:`, X, Y + step * 3);

        for(let y = 0; y < nextFigure.length; y++){
            for(let x = 0; x < nextFigure[y].length; x++){
                if(nextFigure[y][x]){
                    this.paintCell(
                        X + 20,
                        Y + step * 5,
                        x,
                        y,
                        this.figureColor.colors[nextFigure[y][x] + '']
                    );
                }
            }
        }
    }

    paintCell(startX, startY, x, y, fillColor){
        this.context.fillStyle = fillColor;
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 2;
        this.context.fillRect(
            startX + x * this.cellWidth,
            startY + y * this.cellHeight,
            this.cellWidth,
            this.cellHeight
        );
        this.context.strokeRect(
            startX + x * this.cellWidth,
            startY + y * this.cellHeight,
            this.cellWidth,
            this.cellHeight
        );
    }
}