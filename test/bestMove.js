import bestMove from './../src/js/game/board/bestMove';
import chai from 'chai';

const assert = chai.assert;

function checkBestMove(grid, activePlayer, correctMove, done) {
    bestMove(grid, activePlayer, (error, calculatedMove) => {
        if (error) {
            done(error);
            return;
        }
        assert.deepEqual(calculatedMove, correctMove, `The best move should be ${correctMove.toString()}`);
        done();
    });
}

describe('MinMax', function () {
    this.timeout(10000);
    it('Will know how to win', function (done) {
        const grid = [
            [0, null, 1],
            [1, null, null],
            [1, 0, 0]
        ];
        checkBestMove(grid, 1, [1, 1], done);
    });

    it('Will know how to stop the other player', function (done) {
        const grid = [
            [0, null, null],
            [0, 1, null],
            [null, null, null]
        ];
        checkBestMove(grid, 1, [0, 2], done);
    });
    //
    it('Will play till the end even if he will lose', function (done) {
        const grid = [
            [null, 1, null],
            [null, null, 1],
            [0, 0, 1]
        ];
        checkBestMove(grid, 1, [2, 0], done);
    });
});
