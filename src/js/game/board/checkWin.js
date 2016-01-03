import _ from 'underscore';

/**
 * @param {[[]]} grid
 * @param {int} [moveCount]
 * @returns {{}|null} winning result or null if no winner
 */
function checkWin(grid, moveCount) {
    for (let selector = 0; selector < 4; selector++) {
        const result = checkRowColumnDiagonal(selector, grid);
        if (result) {
            return result;
        }
    }

    if (moveCount === grid.length * grid.length) {
        return makeCheckResult('draw', null); // todo might have problems with string token used
    }

    return null;
}

/**
 *
 * @param {int} selector 0 - Rows,
 *                            1 - columns,
 *                            2 - TL-BR,
 *                            3 - BL-TR
 * @param {[[]]} grid
 * @returns {{}|null} winner result or null
 */
function checkRowColumnDiagonal(selector, grid) {
    let iterations = grid.length;

    if (selector === 2 || selector === 3) {
        // diagonals only need one iteration
        iterations = 1;
    }

    for (let j = 0; j < iterations; j++) {
        const consecutiveToCheck = [];
        const correspondingCoords = [];

        var rowOrColumn = grid[j];
        for (let i = 0; i < rowOrColumn.length; i++) {
            let currentCoords;

            switch (selector) {
                case 0:
                    currentCoords = [i, j];
                    break;
                case 1:
                    currentCoords = [j, i];
                    break;
                case 2:
                    currentCoords = [i, i];
                    break;
                case 3:
                    currentCoords = [grid.length - 1 - i, i];
                    break;
                default:
                    throw 'Invalid check row or column or diagonal selector';
                    break;
            }

            const currentCell = grid[currentCoords[1]][currentCoords[0]];
            consecutiveToCheck.push(currentCell);
            correspondingCoords.push(currentCoords);
        }

        const winner = checkVector(consecutiveToCheck);
        if (winner !== null) {
            return makeCheckResult(winner, correspondingCoords);
        }
    }

    return null;
}

/**
 *
 * @param {int|string} winner int or 'draw'
 * @param {[[]]|null} winCoordinates
 */
function makeCheckResult(winner, winCoordinates) {
    return {
        winner: winner,
        winCoordinates: winCoordinates
    }
}

/**
 *
 * @param {[]} vector
 * @returns {int|null} winner
 */
function checkVector(vector) {
    const noNull = vector.every(cell => {
        return cell !== null;
    });

    if (!noNull) {
        return null;
    }
    // no duplicates
    const unique = _.uniq(vector);
    const noDuplicates = unique.length === 1;

    if (!noDuplicates) {
        return null;
    }
    return unique[0];
}

export default checkWin;
