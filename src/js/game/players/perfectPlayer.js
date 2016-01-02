import Player from './player';
import bestMove from './../board/bestMove';

class PerfectPlayer extends Player {
    constructor(...params) {
        super(...params);
        this.onMyTurn(gameGrid => {
            const perfectMove = this.getMove(gameGrid);
            this.makeMove(perfectMove);
        });
    }

    getMove(gameGrid) {
        return bestMove(gameGrid, this.playerNumber)
    }
}

export default PerfectPlayer;
