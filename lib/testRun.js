'use strict';

var _board = require('./board');

var _board2 = _interopRequireDefault(_board);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var board = new _board2.default(); /**
                                    * Created by JiaHao on 31/12/15.
                                    */

console.log(board.makeMove(1, [1, 0]));
console.log(board.makeMove(1, [2, 0]));
console.log(board.makeMove(1, [0, 0]));
console.log(board.gameGrid);