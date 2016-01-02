import Board from './board';

class TicTacToe {
    constructor() {
        this.gameOver = true;
    }

    registerPlayers(player0, player1) {
        this.players = [player0, player1];
    }

    /**
     * @callback winnerCallback
     * @param winner
     */

    /**
     * @param {winnerCallback} [callback] called when game is won. If left empty,
     *                                    the previously saved callback will be called
     */
    newGame(callback) {
        if (this.players.length !== 2) {
            console.error('Need to have 2 players registered');
            return;
        }
        this.board = new Board();
        this.currentTurn = 0;
        this.gameOver = false;
        if (callback) {
            this.winnerCallback = callback;
        }
        this._notifyPlayers();
    }

    get currentPlayerTurn() {
        return this.currentTurn % this.players.length;
    }

    makeMove(playerNumber, moveCoordinates) {
        if (this.gameOver) {
            console.error('Game is not running, cannot make move');
            return;
        }
        if (this.currentPlayerTurn !== playerNumber) {
            console.error('Not your turn! Current turn is player:', this.currentPlayerTurn);
            return;
        }

        let winner = this.board.makeMove(playerNumber, moveCoordinates);
        this.currentTurn += 1;
        this._notifyPlayers(winner);

        if (winner != null && winner !== undefined) {
            this.gameOver = true;

            if (this.winnerCallback) {
                this.winnerCallback(winner);
            }
        }
    }

    _notifyPlayers(winner) {

        this.players.forEach((player, index) => {
            player.notifyBoardChanged(this.board.gameGrid);
            if (winner !== null && winner !== undefined) {
                player.notifyGameOver(winner);
            }
        });

        if (winner !== null && winner !== undefined) {
            return
        }
        this.players[this.currentPlayerTurn].notifyTurn();
    }
}

export default TicTacToe;
