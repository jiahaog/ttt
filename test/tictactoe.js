import TicTacToe from './../src/js/game/board/tictactoe';
import TestPlayer from '../src/js/game/players/testPlayer';
import chai from 'chai';

const assert = chai.assert;

/**
 * @param {[[]]} player0Moves
 * @param {[[]]} player1Moves
 * @param {int} expectedWinner
 */
function testGame(player0Moves, player1Moves, expectedWinner) {
    const game = new TicTacToe();

    const player0 = new TestPlayer(0, 'Player0', game, player0Moves);
    const player1 = new TestPlayer(1, 'Player1', game, player1Moves);

    game.registerPlayers(player0, player1);
    game.newGame(winner => {
        assert.strictEqual(winner, expectedWinner, `Player ${expectedWinner} should win`);
    });
}

describe('TicTacToe Tests', function () {
    this.timeout(20000);
    describe('Preset Player Tests', function () {
        it('Player0 can win', function() {
            testGame(
                [
                    [0, 0],
                    [1, 0],
                    [2, 0]
                ], [
                    [0, 2],
                    [1, 2],
                    [2, 2]
                ], 0
            );
        });

        it('Player1 can win', () => {
            testGame(
                [
                    [0, 0],
                    [1, 1],
                    [2, 0]
                ], [
                    [0, 2],
                    [1, 2],
                    [2, 2]
                ], 1
            );
        });
    });
});
