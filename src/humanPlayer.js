import Player from './player';

class HumanPlayer extends Player {

    getMove(gameGrid) {
        console.log(gameGrid);
        let userInput = readLine.question(`Player ${this.playerName} Enter your move x, y separated by a space:`);
        return userInput.split(/ +/);
    }
}

export default HumanPlayer;
