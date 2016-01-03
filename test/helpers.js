import chai from 'chai';

import helpers from './../src/js/game/helpers';

const assert = chai.assert;

describe('Helper function unit tests', function () {
    describe('isGridEmpty', function () {
        const isGridEmpty = helpers.isGridEmpty;
        it('Empty grid returns true', function () {
            const result = isGridEmpty([
                [null, null, null],
                [null, null, null],
                [null, null, null]
            ]);
            assert.isTrue(result, 'Empty grid should return true');
        });

        it('Not grid returns false', function () {
            const result = isGridEmpty([
                [null, null, 1],
                [null, null, null],
                [null, null, null]
            ]);
            assert.isFalse(result, 'Empty grid should return false');
        })
    });
});
