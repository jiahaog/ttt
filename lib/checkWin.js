'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * @param {[]} board
 * @returns {number | null} the winning player or null
 */
function checkWin(board) {

    var winners = {};
    // check rows
    checkRowsOrColumns(0, board, winners);
    checkRowsOrColumns(1, board, winners);
    checkDiagonals(0, board, winners);
    checkDiagonals(1, board, winners);

    if (_underscore2.default.size(winners) > 0) {
        var finalWinner = 0;
        _underscore2.default.each(winners, function (value, winner) {
            // only get one winner from the list
            finalWinner = winner;
        });
        return finalWinner;
    } else {
        return null;
    }
}

/**
 *
 * @param {int} rowsOrColumns  0 - Rows, 1 - columns
 * @param {[]} board
 * @param {{}} winners
 */
function checkRowsOrColumns(rowsOrColumns, board, winners) {
    // check rows
    for (var j = 0; j < board.length; j++) {
        var consecutive = {};
        for (var i = 0; i < board[j].length; i++) {
            var current = undefined;
            if (rowsOrColumns === 0) {
                current = board[j][i];
            } else {
                current = board[i][j];
            }

            if (current < 0) {
                // skip zero valued position
                continue;
            }

            if (consecutive[current]) {
                consecutive[current] += 1;
            } else {
                consecutive[current] = 1;
            }
        }

        _underscore2.default.forEach(consecutive, function (value, key) {
            if (value === board.length) {
                winners[key] = 1;
            }
        });
    }
}

/**
 *
 * @param {int} selector  0 - TL-BR, 1 - BL-TR
 * @param {[]} board
 * @param {{}} winners
 */
function checkDiagonals(selector, board, winners) {
    var consecutive = {};
    for (var i = 0; i < board.length; i++) {
        var current = undefined;
        if (selector === 0) {
            current = board[i][i];
        } else {
            current = board[board.length - 1 - i][i];
        }

        if (current < 0) {
            // skip zero valued position
            continue;
        }

        if (consecutive[current]) {
            consecutive[current] += 1;
        } else {
            consecutive[current] = 1;
        }
    }
    _underscore2.default.forEach(consecutive, function (value, key) {
        if (value === board.length) {
            winners[key] = 1;
        }
    });
}

exports.default = checkWin;