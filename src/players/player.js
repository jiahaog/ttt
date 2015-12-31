// interface for player
class Player {
    /**
     * @param {int} playerNumber
     * @param {string} [playerName]
     */
    constructor(playerNumber, playerName) {
        this.playerName = playerName;
        this.playerNumber = playerNumber;
    }

    /**
     *
     * @param {[[]]} gameGrid A copied 2D array of the game grid
     */
    getMove(gameGrid) {
    }
}

export default Player;
