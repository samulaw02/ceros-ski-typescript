
export class ScoreBoard {
    private score: number = 0;
    private scoreBoard: HTMLDivElement = document.createElement('div');

    private scoreBoardStyle = {
        position: 'fixed',
        top: '5%',
        right: '5%',
        padding: '.5rem 1rem',
        color: 'white',
        backgroundColor: 'black',
        borderRadius: '5px'
    };

    constructor() {
        this.updateScoreBoard(this.score);

        Object.assign(this.scoreBoard.style, this.scoreBoardStyle);

        document.body.appendChild(this.scoreBoard);
    }

    updateScoreBoard(score: number) {
        const scoreContainer = document.createElement('span');
        scoreContainer.textContent = `Score: ${score}`;

        while (this.scoreBoard.firstChild) {
            this.scoreBoard.removeChild(this.scoreBoard.firstChild);
        }

        this.scoreBoard.appendChild(scoreContainer);
    }
}