import readLine from 'readline';
import Player from './player';
import helpers from './../helpers';
const prettyPrintGrid = helpers.prettyPrintGrid;

class cliPlayer extends Player {

    constructor(...params) {
        super(...params);

        this.onBoardChange(grid => {
            prettyPrintGrid(grid);
        });

        this.onMyTurn(() => {
            let rl = readLine.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            console.log(`=== Player ${this.playerName}\nEnter your move x, y separated by a space:`);
            rl.question('', (userInput) => {
                rl.close();
                const moveCoords = userInput.split(/ +/);
                this.makeMove(moveCoords);

            });

        });

        this.onGameOver(winner => {
            console.log('Winner is:', winner);
        });
    }
}

export default cliPlayer;
