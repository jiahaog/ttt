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
     * @callback winnerDataCallback
     * @param {WinnerData} Winner data
     */

    /**
     * @param {winnerDataCallback} [callback] called when game is won. If left empty,
     *                                        the previously saved callback will be called
     * @throws {string} Error if invalid number of players registered
     */
    newGame(callback=function(){}) {
        if (this.players.length !== 2) {
            throw 'Need to have 2 players registered';
        }

        this.board = new Board();
        this.currentTurn = 0;
        this.gameOver = false;

        this.board.onGameOver((winnerNumber, winCoordinates) => {
            this.gameOver = true;
            const winnerData = new WinnerData(this.players, winnerNumber, winCoordinates);

            this.players.forEach(player => {
                player.notifyGameOver(winnerData);
            });

            callback(winnerData);
        });

        this._notifyPlayers();
    }

    get currentPlayerTurn() {
        return this.currentTurn % this.players.length;
    }

    /**
     * @param {int} playerNumber
     * @param {[[]]} moveCoordinates
     * @returns {boolean} validity of the move
     */
    makeMove(playerNumber, moveCoordinates) {

        if (this.gameOver) {
            throw 'Game is not running, cannot make move'
        }

        if (this.currentPlayerTurn !== playerNumber) {
            throw `Not your turn! Current turn is player: ${this.currentPlayerTurn}`;
        }

        const validMove = this.board.makeMove(playerNumber, moveCoordinates);

        if (!validMove) {
            throw 'Move is invalid!';
        }

        this.currentTurn += 1;
        this._notifyPlayers();


        return true;
    }

    _notifyPlayers() {
        this.players.forEach(player => {
            player.notifyBoardChanged(this.board.gameGrid);
        });

        // When the move is made in makeMove, the callback that checks for the winning condition in board will update
        // this.gameOver even before that function returns, so we can be assured that this.gameOver will already be
        // updated before here.
        if (this.gameOver) {
            return;
        }

        // Don't put this in forEach loop because of concurrency issue
        // where next turn is executed before the forEach completes
        this.players[this.currentPlayerTurn].notifyTurn(this.board.gameGrid);
    }
}

class WinnerData {
    /**
     * @param {[]} players
     * @param {int|string} winnerNumber or 'draw'
     * @param {[]|null} winCoordinates
     * @returns {{}} result
     * @property result.winnerNumber
     * @property result.winnerName
     */
    constructor(players, winnerNumber, winCoordinates) {
        if (winnerNumber === 'draw') {
            return {
                winnerNumber: 'draw',
                winnerName: 'draw',
                winCoordinates: null
            }
        }
        return {
            winnerNumber: winnerNumber,
            winnerName: getWinnerName(players, winnerNumber),
            winCoordinates: winCoordinates
        }
    }
}

/**
 * @param {[]} players
 * @param {int | string} winnerNumber index of the winner or 'draw'
 * @returns {string} winner name or 'draw'
 */
function getWinnerName(players, winnerNumber) {
    let winnerName;
    if (winnerNumber === 'draw') {
        winnerName = winnerNumber;
    } else {
        winnerName = players[winnerNumber].playerName;
    }
    return winnerName;
}

export default TicTacToe;
