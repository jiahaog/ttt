import bestMove from './bestMove';

/**
 * Wrapper to run bestMove in a Web Worker
 */
export default function (self) {
    self.addEventListener('message',function (ev){
        let args = ev.data; // [grid, activePlayer]

        bestMove(...args, (error, bestMove) => {
            self.postMessage([error, bestMove]);
        });
    });
};
