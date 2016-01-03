import checkWin from './../src/js/game/board/checkWin';
import chai from 'chai';

let assert = chai.assert;

describe('Check Win Condition', () => {
    it('Can check rows for winners', () => {
        let board = [
            [null, null, null],
            [null, null, null],
            [1, 1, 1]
        ];

        assert.equal(checkWin(board).winner, 1, 'Player 1 should win');
    });

    it('Can check columns for winners', () => {
        let board = [
            [null, 3, null],
            [null, 3, null],
            [null, 3, null],
        ];

        assert.equal(checkWin(board).winner, 3, 'Player 3 should win');
    });

    it('Can check top-left to bottom-right diagonals for winners', () => {
        let board = [
            [0, null, null],
            [null, 0, null],
            [null, null, 0]
        ];

        assert.equal(checkWin(board).winner, 0, 'Player 0 should win');
    });

    it('Can check bottom-left to top-right diagonals for winners', () => {
        let board = [
            [null, null, 1],
            [null, 1, null],
            [1, null, null]
        ];

        assert.equal(checkWin(board).winner, 1, 'Player 1 should win');
    });

    it('Can check if no one wins', () => {
        let board = [
            [0, 2, 1],
            [1, 2, 1],
            [2, 1, null]
        ];

        assert.notOk(checkWin(board, 5), 'No one should win');
    });

    it('Can check if draw', () => {
        let board = [
            [0, 2, 1],
            [1, 2, 1],
            [2, 1, 4]
        ];

        assert.equal(checkWin(board, 9).winner, 'draw', 'Should be a draw');
    })

});
