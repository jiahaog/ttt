import Board from './board';

class TicTacToe {
    constructor() {
        this.gameOver = true;
    }

    registerPlayers(player0, player1) {
        this.players = [player0, player1];
        // set player numbers
        this.players.forEach((player, index) => {
            player.setPlayerNumber(index);
        });
    }

    /**
     * @callback winnerCallback
     * @param {int|string} winner index of winning player or 'draw'
     * @param {string} winnerName name of winning player or 'draw'
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

        if (winnerExists(winner)) {
            this.gameOver = true;

            if (this.winnerCallback) {
                let winnerName;
                if (winner === 'draw') {
                    winnerName = winner;
                } else {
                    winnerName = this.players[winner].playerName;
                }

                this.winnerCallback(winner, winnerName);
            }
        }
    }

    _notifyPlayers(winner) {

        this.players.forEach(player => {
            player.notifyBoardChanged(this.board.gameGrid);
            if (winnerExists(winner)) {
                player.notifyGameOver(winner);
            }
        });

        if (winnerExists(winner)) {
            return
        }
        // don't put this in forEach loop because of concurrency issue
        // where next turn is executed before the forEach completes
        this.players[this.currentPlayerTurn].notifyTurn(this.board.gameGrid);
    }
}

/**
 * Helper function to check if there is a winner
 * @param {int|string|null|undefined} winner
 */
function winnerExists(winner) {
    // need this because winner can be 0 valued int
    return winner !== null && winner !== undefined;
}

export default TicTacToe;
