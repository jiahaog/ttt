'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _board = require('./board');

var _board2 = _interopRequireDefault(_board);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TicTacToe = (function () {
    function TicTacToe(player0, player1) {
        _classCallCheck(this, TicTacToe);

        this.board = new _board2.default();
        this.players = [player0, player1];
        this.currentTurn = 0;
    }

    _createClass(TicTacToe, [{
        key: 'start',
        value: function start() {
            while (!this.board.gameWinner) {
                this.nextTurn();
            }
            console.log('Game over! Winner: ' + this.board.gameWinner);
        }
    }, {
        key: 'nextTurn',
        value: function nextTurn() {
            prettyPrintGrid(this.board.gameGrid);
            var currentPlayerIndex = this.currentTurn % this.players.length;
            var currentPlayer = this.players[currentPlayerIndex];
            var moveMade = currentPlayer.getMove();
            this.board.makeMove(currentPlayerIndex, moveMade);
            this.currentTurn += 1;
        }
    }]);

    return TicTacToe;
})();

function prettyPrintGrid(grid) {
    var gridString = JSON.stringify(grid);
    var result = gridString.replace(/],/g, ']\n') // split into multiple lines
    .replace(/[\[|\]]/g, '') // remove all brackets
    .replace(/,/g, '  '); // remove commas
    console.log(result);
}

exports.default = TicTacToe;