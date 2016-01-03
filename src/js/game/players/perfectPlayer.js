import Player from './player';
import bestMove from './../board/bestMove';

class PerfectPlayer extends Player {
    /**
     * @param {TicTacToe} game
     * @param {string} [playerName]
     * @param {function} [customBestMove] custom bestMove function
     */
    constructor(game, playerName, customBestMove = bestMove) {
        super(game, playerName);

        this.bestMoveFunction = customBestMove;

        this.onMyTurn(gameGrid => {
            this.getMove(gameGrid, (error, perfectMove) => {
                if (error) {
                    console.error('BestMoveCallbackError:', error);
                    return;
                }
                this.makeMove(perfectMove);
            });
        });
    }

    getMove(gameGrid, callback) {
        this.bestMoveFunction(gameGrid, this.playerNumber, callback);
    }
}

export default PerfectPlayer;
