import bestMove from './../src/bestMove';
import chai from 'chai';
import _ from 'underscore';

const assert = chai.assert;

function checkBestMove(grid, activePlayer, correctMove) {
    const calculatedMove = bestMove(grid, activePlayer);
    const isCorrect = _.isEqual(calculatedMove, correctMove);

    assert.isTrue(isCorrect, `The best move should be ${correctMove.toString()}`);
}

describe('MinMax', () => {
    it('Will know how to win', () => {
        const grid = [
            [0, null, 1],
            [1, null, null],
            [1, 0, 0]
        ];
        checkBestMove(grid, 1, [1, 1]);
    });

    it('Will know how to stop the other player', () => {
        const grid = [
            [0, null, null],
            [0, 1, null],
            [null, null, null]
        ];
        checkBestMove(grid, 1, [0, 2]);
    });
});
