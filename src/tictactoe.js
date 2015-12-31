import Board from './board';
import util from 'util';


class TicTacToe {
    /**
     *
     * @param {Player} player0
     * @param {Player} player1
     */
    constructor(player0, player1) {
        this.board = new Board;
        this.players = [player0, player1];
        this.currentTurn = 0;
    }

    /**
     * @callback gameOverCallback
     * @param {int} winning player number
     */

    /**
     * @param {gameOverCallback} callback
     */
    start(callback) {
        while (this.board.gameWinner === null) {
            this.nextTurn();
        }
        callback(this.board.gameWinner);
    }

    nextTurn() {
        let currentPlayerIndex = this.currentTurn % this.players.length;
        let currentPlayer = this.players[currentPlayerIndex];
        let moveMade = currentPlayer.getMove(this.board.gameGrid);
        this.board.makeMove(currentPlayerIndex, moveMade);
        this.currentTurn += 1;
    }

    showBoard() {
        prettyPrintGrid(this.board.gameGrid);
    }
}

function prettyPrintGrid(grid) {
    const gridString = JSON.stringify(grid);
    const result = gridString
        .replace(/],/g, ']\n') // split into multiple lines
        .replace(/[\[|\]]/g, '') // remove all brackets
        .replace(/,/g, '  '); // remove commas
    console.log(result);
}

export default TicTacToe;
