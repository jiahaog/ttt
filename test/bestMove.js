import bestMove from './../src/bestMove';
import chai from 'chai';

const assert = chai.assert;

function checkBestMove(grid, activePlayer, correctMove) {
    const calculatedMove = bestMove(grid, activePlayer);
    console.log(calculatedMove, correctMove);
    assert.deepEqual(calculatedMove, correctMove, `The best move should be ${correctMove.toString()}`);
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
    //
    it('Will play till the end even if he will lose', () => {
        const grid = [
            [null, 1, null],
            [null, null, 1],
            [0, 0, 1]
        ];
        checkBestMove(grid, 1, [2, 0]);
    });
});
