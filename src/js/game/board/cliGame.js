import TicTacToe from './tictactoe';
import HumanPlayer from '../players/cliPlayer';
import PerfectPlayer from '../players/perfectPlayer';

const game = new TicTacToe(new HumanPlayer(0, 'Human'), new PerfectPlayer(1, 'AI'));
game.start(winner => {
    console.log(`Game over, winner: ${winner}`);
    game.showBoard();
});
