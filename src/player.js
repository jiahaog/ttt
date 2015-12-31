import readLine from 'readline-sync';

class Player {
    // interface for player
    getMove() {

    }
}

class PlayerHuman extends Player {
    constructor(playerName) {
        super();
        this.playerName = playerName;
    }
    getMove() {
        let userInput = readLine.question(`Player ${this.playerName} Enter your move x, y separated by a space:`);
        return userInput.split(/ +/);
    }
}

class PlayerDumb extends Player {
    constructor(moveList) {
        super();
        this.moveList = moveList;
        this.moveCounter = -1;
    }

    getMove() {
        this.moveCounter += 1;
        const moveToMake = this.moveList[this.moveCounter];

        if (!moveToMake) {
            console.log('No more moves!');
        }

        return moveToMake;
    }
}

export default PlayerHuman;