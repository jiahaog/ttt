import checkWin from './../src/js/game/board/checkWin';
import chai from 'chai';

let assert = chai.assert;

describe('Check Win Condition', () => {
    it('Can check rows for winners', () => {
        let board = [
            [0, 0, 0],
            [0, 0, 0],
            [1, 1, 1]
        ];

        assert.equal(checkWin(board), 1, 'Player 1 should win');
    });

    it('Can check columns for winners', () => {
        let board = [
            [0, 3, 0],
            [0, 3, 0],
            [0, 3, 0]
        ];

        assert.equal(checkWin(board), 3, 'Player 3 should win');
    });

    it('Can check diagonals for winners', () => {
        let board = [
            [2, 0, 0],
            [0, 2, 0],
            [0, 0, 2]
        ];

        assert.equal(checkWin(board), 2, 'Player 2 should win');
    });

    it('Can check if no one wins', () => {
        let board = [
            [1, 2, 1],
            [1, 2, 1],
            [2, 1, 2]
        ];

        assert.notOk(checkWin(board), 1, 'No one should win');
    })

});
