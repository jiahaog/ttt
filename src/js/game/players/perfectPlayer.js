import Player from './player';
import bestMove from './../board/bestMove';

class PerfectPlayer extends Player {
    /*
     * @param {[[]]} gameGrid A copied 2D array of the game grid
     */
    getMove(gameGrid) {
        return bestMove(gameGrid, this.playerNumber)
    }
}

export default PerfectPlayer;
