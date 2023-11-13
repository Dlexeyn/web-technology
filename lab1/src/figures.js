export default class FigureGenerator{
    figures = {
        0: [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]
        ],
        1: [
            [0, 2, 2],
            [2, 2, 0],
            [0, 0, 0]
        ],
        2: [
            [3, 3],
            [3, 3]
        ],
        3: [
            [4, 0, 0],
            [4, 4, 4],
            [0, 0, 0]
        ],
        4: [
            [5, 5, 0],
            [0, 5, 5],
            [0, 0, 0]
        ],
        5: [
            [0, 0, 6],
            [6, 6, 6],
            [0, 0, 0]
        ],
        6: [
            [7, 7, 7, 7],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
    }

    generateNextFigure(){
        let index = Math.floor(Math.random() * 7);
        return this.figures[index.toString()];
    }
}