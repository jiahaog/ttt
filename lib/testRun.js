'use strict';

var _tictactoe = require('./tictactoe');

var _tictactoe2 = _interopRequireDefault(_tictactoe);

var _player = require('./player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by JiaHao on 31/12/15.
 */

var game = new _tictactoe2.default(new _player2.default('Human 0'), new _player2.default('Human 2'));
game.start();