/**
 * Created by JiaHao on 31/12/15.
 */


import TicTacToe from './tictactoe';
import PlayerHuman from './player';

const game = new TicTacToe(new PlayerHuman('Human 0'), new PlayerHuman('Human 2'));
game.start();
