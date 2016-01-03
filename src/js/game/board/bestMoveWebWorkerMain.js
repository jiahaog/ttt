import webworkify from 'webworkify';

/**
 * Wrapper to execute bestMove in a Web Worker, with the same api we use in bestMove.js
 * @param grid
 * @param activePlayer
 * @param callback
 */
function bestMoveWorkerMain(grid, activePlayer, callback) {
    var worker = webworkify(require('./bestMoveWebWorker.js'));

    worker.addEventListener('message', (ev) => {
        const params = ev.data; // [error, bestMoveCoordinates]
        callback(...params);
    });
    worker.postMessage([grid, activePlayer]);
}

export default bestMoveWorkerMain;
