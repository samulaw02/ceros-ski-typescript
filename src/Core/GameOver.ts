import { Game } from "./Game";
import { RESET_TIMEOUT, CEROS_WEBSITE } from "../Constants";

/**
 * This class represents the game over screen, which is displayed when the game ends. It provides options to restart
 * the game or exit the game.
 */
export class GameOver {
    private gameOverStyle = {
        opacity: 0,
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '5rem',
        color: 'white',
        backgroundColor: 'red',
        borderRadius: '5px',
        textAlign: 'center',
        transition: 'opacity .3s',
    };

    private gameOver!: HTMLDivElement;
    private gameOverMessageContainer!: HTMLSpanElement;

    constructor() {
        this.createGameOverElements();
        this.addEventListeners();
    }

    private createGameOverElements() {
        this.gameOver = document.createElement('div');
        this.gameOverMessageContainer = document.createElement('span');
        this.gameOverMessageContainer.innerHTML = `
            <h1>Game Over</h1>
            <p>Do you want to reset the game?</p>
            <button id="restartButton">Yes</button>
            <button id="exitButton">No</button>
        `;

        this.gameOver.appendChild(this.gameOverMessageContainer);
        Object.assign(this.gameOver.style, this.gameOverStyle);
        document.body.appendChild(this.gameOver);
    }

    private addEventListeners() {
        const restartButton = document.getElementById('restartButton');
        if (restartButton) {
            restartButton.addEventListener('click', () => {
                this.restartGame();
            });
        }

        const exitButton = document.getElementById('exitButton');
        if (exitButton) {
            exitButton.addEventListener('click', () => {
                this.exitGame();
            });
        }
    }

    show() {
        this.gameOver.style.opacity = '1';
    }

    hide() {
        this.gameOver.style.opacity = '0';
    }

    /**
     * Reset the game after the user clicks "Yes"
     */
    restartGame() {
        this.hide();
        setTimeout(() => {
            window.location.reload();
        }, RESET_TIMEOUT);
    }

    /**
     * Exit the game after the user clicks "No"
     */
    exitGame() {
        this.hide();
        setTimeout(() => {
            //Redirect the user to ceros
            window.location.replace(CEROS_WEBSITE);
        }, RESET_TIMEOUT);
    }
}