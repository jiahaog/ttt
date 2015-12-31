import checkWin from './checkWin';

const BOARD_SIZE = 3;
const DIMENSIONS = 2;

class Board {
    constructor() {
        this.grid = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
    }

    /**
     *
     * @param {int} player > 1
     * @param {[]} coordinates length 2 list of coordinates
     * @returns {number|null} the winning player or null
     */
    makeMove(player, coordinates) {
        if (this._markPlayerMove(player, coordinates)) {
            return checkWin(this.grid);
        }
    }

    /**
     * @param {int} player > 1
     * @param {[]} coordinates length 2 list of coordinates
     */
    _markPlayerMove(player, coordinates) {

        // check if valid player
        if (player < 1) {
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
        if (playerAtCoordinates !== 0) {
            throw 'Grid has already been occupied at point!'
        }

        this.grid[coordinates[1]][coordinates[0]] = player;
        return true;
    }

    get gameGrid() {
        return this.grid;
    }

}

export default Board;
