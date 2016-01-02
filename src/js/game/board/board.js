import checkWin from './checkWin';
import helpers from './../helpers';

const deepCopy = helpers.deepCopy;

const BOARD_SIZE = 3;
const DIMENSIONS = 2;

const emptyGrid = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

class Board {
    /**
     * @param {[[]]} [initGrid]
     */
    constructor(initGrid = emptyGrid) {
        this.grid = deepCopy(initGrid);
        this.gameWinner = null;
        this.moveCount = 0;
    }

    /**
     *
     * @param {int} player
     * @param {[]} coordinates length 2 list of coordinates
     * @returns {number|null|string} the winning player or null or 'draw' if draw
     */
    makeMove(player, coordinates) {
        if (this.gameWinner) {
            throw 'Game has already ended';
        }
        // valid move
        if (this._markPlayerMove(player, coordinates)) {
            this.moveCount += 1;
            let winner = checkWin(this.grid);
            // need to check for null because a winning player can be int value 0
            if (winner !== null) {
                this.gameWinner = winner;
            }

            if (this.moveCount === BOARD_SIZE*BOARD_SIZE) {
                this.gameWinner = 'draw'; // todo might have problems with string token used
            }

            return this.gameWinner;
        }
    }

    /**
     * @param {int} player
     * @param {[]} coordinates length 2 list of coordinates
     * @returns {boolean} true if valid move
     */
    _markPlayerMove(player, coordinates) {
        // check if valid player
        if (player === null || player === undefined) {
            throw 'Player is invalid';
        }

        // check if coordinates is valid
        if (coordinates.length !== DIMENSIONS) {
            throw 'Invalid coordinates dimensions';
        }

        // check coordinate in bounds
        coordinates.forEach(coordinate => {
            if (coordinate >= BOARD_SIZE) {
                throw 'Coordinates out of bounds';
            }
        });

        // check position is empty
        const playerAtCoordinates = this.grid[coordinates[1]][coordinates[0]];
        if (playerAtCoordinates !== null) {
            throw 'Grid has already been occupied at point!'
        }

        this.grid[coordinates[1]][coordinates[0]] = player;
        return true;
    }

    get gameGrid() {
        return deepCopy(this.grid);
    }
}

export default Board;
