'use strict';

var _tictactoe = require('./tictactoe');

var _tictactoe2 = _interopRequireDefault(_tictactoe);

var _player = require('./player');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var player0 = new _player.PlayerDumb('Player0', [[0, 0], [1, 0], [2, 0]]);
var player1 = new _player.PlayerDumb('Player1', [[0, 2], [1, 2], [2, 2]]);

var game = new _tictactoe2.default(player0, player1);
game.start(function (winner) {
    console.log('Game over, winner: ' + winner);
    game.showBoard();
});