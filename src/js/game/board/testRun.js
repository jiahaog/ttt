import TicTacToe from './tictactoe';
import PreconfiguredPlayer from '../players/preconfiguredPlayer';

const player0 = new PreconfiguredPlayer(0, 'Player0', [
    [0, 0],
    [1, 0],
    [2, 0]
]);
const player1 = new PreconfiguredPlayer(1, 'Player1', [
    [0, 2],
    [1, 2],
    [2, 2]
]);

const game = new TicTacToe(player0, player1);
game.start(winner => {
    console.log(`Game over, winner: ${winner}`);
    game.showBoard();
});

