import Player from './player';

class PreconfiguredPlayer extends Player {
    constructor(playerName, moveList) {
        super(playerName);
        this.moveList = moveList;
        this.moveCounter = -1;
    }

    getMove(gameGrid) {
        this.moveCounter += 1;
        const moveToMake = this.moveList[this.moveCounter];

        if (!moveToMake) {
            console.log(`Player: ${this.playerName} No more moves!`);
        }

        return moveToMake;
    }
}

export default PreconfiguredPlayer;
