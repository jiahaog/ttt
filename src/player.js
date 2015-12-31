import readLine from 'readline-sync';

// interface for player
class Player {
    /**
     * @param {string} [playerName]
     */
    constructor(playerName) {
        this.playerName = playerName;
    }

    /**
     *
     * @param {[[]]} gameGrid A copied 2D array of the game grid
     */
    getMove(gameGrid) {
    }
}

class HumanPlayer extends Player {

    getMove(gameGrid) {
        console.log(gameGrid);
        let userInput = readLine.question(`Player ${this.playerName} Enter your move x, y separated by a space:`);
        return userInput.split(/ +/);
    }
}

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

export {Player, HumanPlayer, PreconfiguredPlayer};
