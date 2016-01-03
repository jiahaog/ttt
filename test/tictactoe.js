import _ from 'underscore';
import chai from 'chai';
import async from 'async';

import TicTacToe from './../src/js/game/board/tictactoe';
import TestPlayer from '../src/js/game/players/testPlayer';
import RandomPlayer from '../src/js/game/players/randomPlayer';
import PerfectPlayer from '../src/js/game/players/perfectPlayer';

const assert = chai.assert;

/**
 * @param {[[]]} player0Moves
 * @param {[[]]} player1Moves
 * @param {int} expectedWinner
 */
function testGame(player0Moves, player1Moves, expectedWinner) {
    const game = new TicTacToe();

    const player0 = new TestPlayer(game, 'Player0', player0Moves);
    const player1 = new TestPlayer(game, 'Player1', player1Moves);

    game.registerPlayers(player0, player1);
    game.newGame(winnerData => {
        assert.strictEqual(winnerData.winnerNumber, expectedWinner, `Player ${expectedWinner} should win`);
    });
}

function randomVsAiGame(callback) {
    const game = new TicTacToe();

    const aiName = 'perfectPlayer';
    const player0 = new RandomPlayer(game, 'Player0');
    const player1 = new PerfectPlayer(game, aiName);

    const playerRandomized = _.shuffle([player0, player1]);

    game.registerPlayers(...playerRandomized);

    game.newGame(winnerData => {
        const winnerName = winnerData.winnerName;
        const aiWinsOrDraws = winnerName === aiName || winnerName === 'draw';

        if (!aiWinsOrDraws) {
            callback(`AI did not win, Winner: ${winnerName}`);
            return;
        }

        callback();
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

        it('AI always draws or wins', function (done) {
            const GAMES_TO_SIMULATE = 1;
            let toSimulate = [];
            for (let counter = 0; counter < GAMES_TO_SIMULATE; counter++) {
                toSimulate.push(randomVsAiGame);
            }

            async.each(toSimulate, function(game, callback) {
                game(callback);
            }, function(error){
                done(error);
            });
        })
    });
});
