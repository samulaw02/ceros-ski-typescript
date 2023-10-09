/**
 * This class represents the game pause screen, which is displayed when the game is paused
 * the game is paused by pressing the escape key and also resume likewise.
 */

export class GamePaused {

    private gamePausedStyle = {
        opacity: 0,
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '5rem',
        color: 'white',
        backgroundColor: 'blue',
        borderRadius: '5px',
        textAlign: 'center',
        transition: 'opacity .3s'
    };

    private paused = false;
    private gamePaused: HTMLDivElement;
    private pauseMessageContainer: HTMLSpanElement;

    constructor() {
        this.gamePaused = document.createElement('div');
        this.pauseMessageContainer = document.createElement('span');
        this.pauseMessageContainer.innerHTML = `<h1>Game Paused</h1> <p>Press ESC to continue</p>`;
        this.gamePaused.appendChild(this.pauseMessageContainer);
        Object.assign(this.gamePaused.style, this.gamePausedStyle);
        document.body.appendChild(this.gamePaused);
    }

    show() {
        this.gamePaused.style.opacity = '1';
    }

    hide() {
        this.gamePaused.style.opacity = '0';
    }
}