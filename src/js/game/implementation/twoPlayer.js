import TicTacToe from './../board/tictactoe';
import CliPlayer from '../players/cliPlayer';

const game = new TicTacToe();

const player0 = new CliPlayer(game, 'Player0');
const player1 = new CliPlayer(game, 'Player1');

game.registerPlayers(player0, player1);
game.newGame();
