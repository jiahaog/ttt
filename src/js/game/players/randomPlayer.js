import Player from './player';
import helpers from './../helpers';
import _ from 'underscore'

const getPossibleMoves = helpers.getPossibleMoves;

class RandomPlayer extends Player {
    constructor(...params) {
        super(...params);
        this.onMyTurn(gameGrid => {
            const possibleMoves = getPossibleMoves(gameGrid);
            const randomMove = _.sample(possibleMoves);
            this.makeMove(randomMove);
        });
    }
}

export default RandomPlayer;
