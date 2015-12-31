import TicTacToe from './tictactoe';
import {HumanPlayer, PreconfiguredPlayer} from './players/player';

const player0 = new PreconfiguredPlayer('Player0', [
    [0, 0],
    [1, 0],
    [2, 0]
]);
const player1 = new PreconfiguredPlayer('Player1', [
    [0, 2],
    [1, 2],
    [2, 2]
]);

const game = new TicTacToe(player0, player1);
game.start(winner => {
    console.log(`Game over, winner: ${winner}`);
    game.showBoard();
});
