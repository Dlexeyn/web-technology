const LEFT_ARROW = 37;
const UP_ARROW = 38;
const RIGHT_ARROW = 39;
const DOWN_ARROW = 40;
const ENTER = 13;
const SPACE = 32;

export default class Controller{
    constructor(game, view){
        this.game = game;
        this.view = view;
        this.timerInterval = 1000;
        this.isPause = false;
        this.isEndGame = false;
        this.timerID = null;

        document.addEventListener('keydown', this.handleKeyDown.bind(this));

        this.play();
    }
    
    moveDownUpdate(){
        this.game.moveFigureDown();
        this.play();
    }

    pause(){
        this.isPause = true;
        clearInterval(this.timerID);
        this.timerID = null;
        this.view.paintPause();
    }

    play(){
        this.timerInterval = 1000 - this.game.level * 100;
        this.isPause = false;

        const state = this.game.getState();
        if(state.isGameOver){
            this.endGame(state.score);
            this.isEndGame = true;
            return;
        }

        if(!this.timerID){
            this.timerID = setInterval(() => {
                this.moveDownUpdate();
            }, this.timerInterval);
        }
        this.view.paintField(state);
    }

    endGame(score){
        clearInterval(this.timerID);
        this.timerID = null;
        localStorage.removeItem('username');
        localStorage.setItem(game.player, game.score + '');
        this.view.paintGameOverScreen(score);
    }

    handleKeyDown(event){
        if(this.isEndGame && event.keyCode !== ENTER)
            return;

        switch(event.keyCode){
            case ENTER:
                if(this.isEndGame){
                    this.restart();
                }
                else if(this.isPause){
                    this.play();
                } else {
                    this.pause();
                }
                break;
            case SPACE:
                this.game.dropFigure();
                this.play();
                break;
            case LEFT_ARROW:
                this.game.moveFigureLeft();
                this.play();
                break;
            case RIGHT_ARROW:
                this.game.moveFigureRight();
                this.play();
                break;
            case UP_ARROW:
                this.game.rotateFigureLeft()
                this.play();
                break;
            case DOWN_ARROW:
                this.game.moveFigureDown();
                this.play();
                break;
        }
    }

    restart() {
        console.log("restart");
        this.game.clearField();
        this.isEndGame = false;
        this.play();
    }
}