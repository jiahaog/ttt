import Player from './player';

/**
 * Player who has a defined set of moves to take in order
 */
class TestPlayer extends Player {
    constructor(game, playerName, moveList) {
        super(game, playerName);
        this.moveList = moveList;

        this.onMyTurn(() => {
            const moveCoords = this.moveList.shift();
            if (!moveCoords) {
                console.error(`${this.playerName}: No more moves!`);
                return;
            }

            this.makeMove(moveCoords);
        });
    }
}

export default TestPlayer;
