import readLine from 'readline-sync';

// interface for player
class Player {
    /**
     * @param {string} [playerName]
     */
    constructor(playerName) {
        this.playerName = playerName;
    }

    /**
     *
     * @param {[[]]} gameGrid A copied 2D array of the game grid
     */
    getMove(gameGrid) {
    }
}

export default Player;
