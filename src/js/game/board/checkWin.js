import _ from 'underscore';

/**
 *
 * @param {[[]]} grid
 * @returns {number|string|null} the winning player, 'draw' or null
 */
function checkWin(grid, moveCount) {

    let winners = {};
    // check rows
    checkRowsOrColumns(0, grid, winners);
    checkRowsOrColumns(1, grid, winners);
    checkDiagonals(0, grid, winners);
    checkDiagonals(1, grid, winners);

    if (_.size(winners) > 0) {
        let finalWinner = 0;
        _.each(winners, (value, winner) => {
            // only get one winner from the list
            // need to parse int because object keys is a string
            finalWinner = parseInt(winner);
        });
        return finalWinner;
    } else {
        if (moveCount === grid.length * grid.length) {
            return 'draw'; // todo might have problems with string token used
        }
        return null;
    }
}

/**
 *
 * @param {int} rowsOrColumns  0 - Rows, 1 - columns
 * @param {[[]]} grid
 * @param {{}} winners
 */
function checkRowsOrColumns(rowsOrColumns, grid, winners) {
    // check rows
    for (var j = 0; j < grid.length; j++) {
        let consecutive = {};
        for (var i = 0; i < grid[j].length; i++) {
            let current;
            if (rowsOrColumns === 0) {
                current = grid[j][i];

            } else {
                current = grid[i][j];

            }

            if (current === null) {
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
            if (value === grid.length) {
                winners[key] = 1;
            }
        });
    }
}

/**
 *
 * @param {int} selector  0 - TL-BR, 1 - BL-TR
 * @param {[[]]} grid
 * @param {{}} winners
 */
function checkDiagonals(selector, grid, winners) {
    let consecutive = {};
    for (var i = 0; i < grid.length; i++) {
        let current;
        if (selector === 0) {
            current = grid[i][i];
        } else {
            current = grid[grid.length - 1 - i][i];
        }

        if (current === null) {
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
        if (value === grid.length) {
            winners[key] = 1;
        }
    });
}

export default checkWin;
