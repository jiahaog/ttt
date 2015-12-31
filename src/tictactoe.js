import Board from './board';
import util from 'util';


class TicTacToe {
    constructor(player0, player1) {
        this.board = new Board;
        this.players = [player0, player1];
        this.currentTurn = 0;
    }

    start() {
        while(!this.board.gameWinner) {
            this.nextTurn();
        }
        console.log(`Game over! Winner: ${this.board.gameWinner}`);
    }

    nextTurn() {
        prettyPrintGrid(this.board.gameGrid);
        let currentPlayerIndex = this.currentTurn % this.players.length;
        let currentPlayer = this.players[currentPlayerIndex];
        let moveMade = currentPlayer.getMove();
        this.board.makeMove(currentPlayerIndex, moveMade);
        this.currentTurn += 1;
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
