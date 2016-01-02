// interface for player
class Player {
    /**
     * @param {int} playerNumber
     * @param {string} [playerName]
     * @param {TicTacToe} game
     */
    constructor(playerNumber, playerName, game) {
        this.playerName = playerName;
        this.playerNumber = playerNumber;
        this.game = game;
    }

    // functions called by board, don't touch

    notifyBoardChanged(grid) {
        if (this.boardChangedCallback) {
            this.boardChangedCallback(grid);
        }
    }

    notifyTurn(grid) {
        if (this.myTurnCallback) {
            this.myTurnCallback(grid);
        }
    }

    notifyGameOver(winner) {
        if (this.gameOverCallback) {
            this.gameOverCallback(winner);
        }
    }

    // register callbacks here

    onBoardChange(callback) {
        this.boardChangedCallback = callback;
    }

    onMyTurn(callback) {
        this.myTurnCallback = callback;
    }

    onGameOver(callback) {
        this.gameOverCallback = callback;
    }

    // actions

    makeMove(moveCoordinates) {
        this.game.makeMove(this.playerNumber, moveCoordinates);
    }
}

export default Player;
