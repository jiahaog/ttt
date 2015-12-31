/**
 * Created by JiaHao on 31/12/15.
 */


import Board from './board';

const board = new Board();
console.log(board.makeMove(1, [1,0]));
console.log(board.makeMove(1, [2,0]));
console.log(board.makeMove(1, [0,0]));
console.log(board.gameGrid);