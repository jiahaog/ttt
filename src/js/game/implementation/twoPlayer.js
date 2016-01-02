import TicTacToe from './../board/tictactoe';
import CliPlayer from '../players/cliPlayer';

const game = new TicTacToe();

const player0 = new CliPlayer(0, 'Player0', game);
const player1 = new CliPlayer(1, 'Player1', game);

game.registerPlayers(player0, player1);
game.newGame();
