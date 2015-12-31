import TicTacToe from './tictactoe';
import {PlayerHuman, PlayerDumb} from './player';

const player0 = new PlayerDumb('Player0', [
    [0, 0],
    [1, 0],
    [2, 0]
]);
const player1 = new PlayerDumb('Player1', [
    [0, 2],
    [1, 2],
    [2, 2]
]);

const game = new TicTacToe(player0, player1);
game.start(winner => {
    console.log(`Game over, winner: ${winner}`);
    game.showBoard();
});
