'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _checkWin = require('./checkWin');

var _checkWin2 = _interopRequireDefault(_checkWin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BOARD_SIZE = 3;
var DIMENSIONS = 2;

var Board = (function () {
    function Board() {
        _classCallCheck(this, Board);

        this.grid = [[-1, -1, -1], // -1 used to indicate empty
        [-1, -1, -1], [-1, -1, -1]];
        this.gameWinner = null;
    }

    /**
     *
     * @param {int} player > 1
     * @param {[]} coordinates length 2 list of coordinates
     * @returns {number|null} the winning player or null
     */

    _createClass(Board, [{
        key: 'makeMove',
        value: function makeMove(player, coordinates) {
            // valid move
            if (this._markPlayerMove(player, coordinates)) {
                var winner = (0, _checkWin2.default)(this.grid);
                if (winner) {
                    this.gameWinner = winner;
                }
                return winner;
            }
        }

        /**
         * @param {int} player > 1
         * @param {[]} coordinates length 2 list of coordinates
         */

    }, {
        key: '_markPlayerMove',
        value: function _markPlayerMove(player, coordinates) {

            // check if valid player
            if (player < 0) {
                throw 'Player is invalid';
            }

            // check if coordinates is valid
            if (coordinates.length !== DIMENSIONS) {
                throw 'Invalid coordinates dimensions';
            }

            // check coordinate in bounds
            coordinates.forEach(function (coordinate) {
                if (coordinate >= BOARD_SIZE) {
                    throw 'Coordinates out of bounds';
                }
            });

            // check position is empty
            var playerAtCoordinates = this.grid[coordinates[1]][coordinates[0]];
            if (playerAtCoordinates > -1) {
                throw 'Grid has already been occupied at point!';
            }

            this.grid[coordinates[1]][coordinates[0]] = player;
            return true;
        }
    }, {
        key: 'gameGrid',
        get: function get() {
            return this.grid;
        }
    }]);

    return Board;
})();

exports.default = Board;