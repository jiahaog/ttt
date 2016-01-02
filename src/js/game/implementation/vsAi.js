import TicTacToe from './../board/tictactoe';
import CliPlayer from '../players/cliPlayer';
import PerfectPlayer from '../players/perfectPlayer';

const game = new TicTacToe();

const player0 = new CliPlayer(game, 'Player0');
const aiPlayer = new PerfectPlayer(game, 'AI-Player');

game.registerPlayers(player0, aiPlayer);
game.newGame();
