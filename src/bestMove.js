import checkWin from './checkWin';
import helpers from './helpers';
const deepCopy = helpers.deepCopy;

function getPossibleMoves(grid) {
    const possibleMoves = [];
    for (var j = 0; j < grid.length; j++) {
        let row = grid[j];

        for (var i = 0; i < row.length; i++) {
            var point = row[i];
            if (point === null) {
                possibleMoves.push([i, j]);
            }
        }
    }
    return possibleMoves;
}

/**
 * Wrapper to simplify first run of Minimax
 * @param grid
 * @param activePlayer
 * @returns {*[]|int}
 */
function bestMove(grid, activePlayer) {
    return minimax(grid, activePlayer, activePlayer, 0, true);
}

/**
 *
 * @param {[[]]} grid
 * @param {int} currentPlayer Player for this recursion instance
 * @param {int} activePlayer Player who is trying to be smart
 * @param {int} depth So that the algorithm is not fatalistic if it knows it will lose
 * @param {boolean} [topLevel]
 * @returns {[] | int} best move to make if `topLevel` is true, or the best score
 */
function minimax(grid, currentPlayer, activePlayer, depth, topLevel = false) {
    let gameStateScore = score(grid, activePlayer, depth);
    if (gameStateScore !== 0) {
        // game over
        return gameStateScore;
    }

    depth += 1;

    // game not over

    const possibleMoves = getPossibleMoves(grid);
    const correspondingScores = possibleMoves.map((move) => {
        const newGridState = makeMove(grid, move, currentPlayer);
        const nextPlayer = getOtherPlayer(currentPlayer);
        return minimax(newGridState, nextPlayer, activePlayer, depth);
    });

    //console.log('Possible Moves', possibleMoves);
    //console.log('Corresponding Scores', correspondingScores);
    let result;

    if (correspondingScores.length === 0) {
        return 0;
    }

    if (currentPlayer === activePlayer) {
        result = Math.max(...correspondingScores);
    } else {
        result = Math.min(...correspondingScores);
    }

    if (topLevel) {
        const moveIndexToMake = correspondingScores.indexOf(result);
        return possibleMoves[moveIndexToMake];
    }
    return result;
}

function getOtherPlayer(currentPlayer) {
    if (currentPlayer === 0) {
        return 1;
    } else {
        return 0;
    }
}

function makeMove(grid, move, player) {
    const copiedGrid = deepCopy(grid);
    copiedGrid[move[1]][move[0]] = player;
    return copiedGrid;
}

function score(grid, activePlayer, depth) {
    const winner = checkWin(grid);
    if (winner !== null) {
        if (winner === activePlayer) {
            return 10 - depth;
        } else {
            return -10 - depth;
        }
    } else {
        return 0;
    }
}

export default bestMove;
