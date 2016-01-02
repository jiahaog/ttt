import TicTacToe from './../board/tictactoe';
import CliPlayer from '../players/cliPlayer';
import PerfectPlayer from '../players/perfectPlayer';

const game = new TicTacToe();

const player0 = new CliPlayer(0, 'Player0', game);
const aiPlayer = new PerfectPlayer(1, 'AI-Player', game);

game.registerPlayers(player0, aiPlayer);
game.newGame();
