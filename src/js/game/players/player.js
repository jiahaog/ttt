// interface for player
class Player {
    /**

     * @param {string} [playerName]
     * @param {TicTacToe} game
     */
    constructor(game, playerName) {
        this.playerName = playerName;
        this.game = game;
    }

    // functions called by board, don't touch

    /**
     * Called on register player by Board
     * @param {int} playerNumber
     */
    setPlayerNumber(playerNumber) {
        this.playerNumber = playerNumber;
    }

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
