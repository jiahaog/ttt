import Board from './board';

class TicTacToe {
    constructor() {
        this.gameOver = true;
    }

    registerPlayers(player0, player1) {
        this.players = [player0, player1];
    }

    newGame() {
        if (this.players.length !== 2) {
            console.error('Need to have 2 players registered');
            return;
        }
        this.board = new Board();
        this.currentTurn = 0;
        this.gameOver = false;

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
        }
    }

    _notifyPlayers(winner) {
        this.players.forEach((player, index) => {
            player.notifyBoardChanged(this.board.gameGrid);
            if (winner !== null && winner !== undefined) {
                player.notifyGameOver(winner);
                return;
            }

            if (index === this.currentPlayerTurn) {
                player.notifyTurn();
            }
        });
    }
}

export default TicTacToe;
