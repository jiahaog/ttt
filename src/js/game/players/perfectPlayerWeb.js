import PerfectPlayer from './perfectPlayer';
import bestMoveWebWorkerMain from './../board/bestMoveWebWorkerMain';

/**
 * Perfect player using Web Workers
 * Can't use this in node.js, only for web!
 */
class PerfectPlayerWeb extends PerfectPlayer {
    constructor(game, playerName) {
        super(game, playerName, bestMoveWebWorkerMain);
    }
}

export default PerfectPlayerWeb;
