import _ from 'underscore';

/**
 *
 * @param {[]} board
 * @returns {number | null} the winning player or null
 */
function checkWin(board) {

    let winners = {};
    // check rows
    checkRowsOrColumns(0, board, winners);
    checkRowsOrColumns(1, board, winners);
    checkDiagonals(0, board, winners);
    checkDiagonals(1, board, winners);

    if (_.size(winners) > 0) {
        let finalWinner = 0;
        _.each(winners, (value, winner) => {
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
        let consecutive = {};
        for (var i = 0; i < board[j].length; i++) {
            let current;
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

        _.forEach(consecutive, (value, key) => {
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
    let consecutive = {};
    for (var i = 0; i < board.length; i++) {
        let current;
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
    _.forEach(consecutive, (value, key) => {
        if (value === board.length) {
            winners[key] = 1;
        }
    });
}

export default checkWin;
