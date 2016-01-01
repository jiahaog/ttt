import readLine from 'readline-sync';
import Player from './player';
import helpers from './../helpers';
const prettyPrintGrid = helpers.prettyPrintGrid;

class cliPlayer extends Player {

    getMove(gameGrid) {
        prettyPrintGrid(gameGrid);
        let userInput = readLine.question(`Player ${this.playerName} Enter your move x, y separated by a space:`);
        return userInput.split(/ +/);
    }
}

export default cliPlayer;
