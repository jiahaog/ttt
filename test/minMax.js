import bestMove from './../src/minMax';
import chai from 'chai';
import _ from 'underscore';

const assert = chai.assert;

describe('MinMax', () => {
    it('Depth: 1', () => {
        const grid = [
            [0, null, 1],
            [1, null, null],
            [1, 0, 0]
        ];

        const isCorrect = _.isEqual(bestMove(grid, 1), [1, 1]);
        assert.isTrue(isCorrect, 'The best move should be [1, 1]');
    });

    it('Deeper', () => {

    });
});
