import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'underscore';

import gameApi from './game/index.js';
const PerfectPlayer = gameApi.players.PerfectPlayerWeb;
const Player = gameApi.players.Player;

const gameStates = {
    CHOOSE_PLAYER: 'STATE_CHOOSE_PLAYER',
    GAME_IN_PROGRESS: 'STATE_GAME_IN_PROGRESS',
    GAME_OVER: 'STATE_GAME_OVER'
};

const newGameReactState = {
    gameState: gameStates.CHOOSE_PLAYER,
    myTurn: false,
    gameGrid: null,
    winnerName: null,
    winCoordinates: null
};

let GameGrid = React.createClass({
    getInitialState: function () {
        return _.clone(newGameReactState);
    },
    cellClicked: function (event) {
        if (!this.state.myTurn) {
            return;
        }
        this.setState({
            myTurn: false
        });

        const cellId = event.target.id;
        const cellCoordinates = parseGameCellId(cellId);

        try {
            this.state.player.makeMove(cellCoordinates);
        } catch (invalidMoveMessage) {
            this.setState({
                myTurn: true
            });
        }
    },
    newGame: function (event) {
        this.setState(_.clone(newGameReactState));
    },
    choosePlayer: function (event) {
        const playerChosen = parseInt(event.target.dataset.player);

        const game = new gameApi.TicTacToe();
        const aiPlayer = new PerfectPlayer(game, 'AI-Player');
        const clientPlayer = new Player(game, 'You');

        clientPlayer.onBoardChange(grid => {
            this.setState({
                gameGrid: grid
            });
        });

        clientPlayer.onMyTurn(() => {
            this.setState({
                myTurn: true
            });
        });

        clientPlayer.onGameOver(winnerData => {
            this.setState({
                gameState: gameStates.GAME_OVER,
                winnerName: winnerData.winnerName,
                winCoordinates: winnerData.winCoordinates
            });
        });

        if (playerChosen === 1) {
            // start second
            game.registerPlayers(aiPlayer, clientPlayer);
        } else {
            game.registerPlayers(clientPlayer, aiPlayer);
        }

        game.newGame();

        this.setState({
            gameState: gameStates.GAME_IN_PROGRESS,
            player: clientPlayer
        });
    },
    maybeShowWinnerText: function () {
        if (this.state.gameState !== gameStates.GAME_OVER) {
            return;
        }

        let winnerName = this.state.winnerName;

        if (winnerName === 'draw') {
            return <div>
                It's a draw!
            </div>
        } else {
            return <div>
                {winnerName} wins!
            </div>
        }
    },
    maybeShowLoader: function () {
        if (this.state.myTurn || this.state.gameState !== gameStates.GAME_IN_PROGRESS) {
            return ''
        }

        return <div className="progress">
            <div className="indeterminate"></div>
        </div>
    },
    generateGameGrid: function () {
        return generateGameGrid(this.state.gameGrid, this, this.state.winCoordinates);
    },
    render: function () {
        if (this.state.gameState === gameStates.CHOOSE_PLAYER) {
            return <div>
                <a className="waves-effect waves-light btn" data-player="0" onClick={this.choosePlayer}>Start First</a>
                <a className="waves-effect waves-light btn" data-player="1" onClick={this.choosePlayer}>Start Second</a>
            </div>
        }

        return <div>
            {this.generateGameGrid()}
            {this.maybeShowLoader()}
            {this.maybeShowWinnerText()}
            <a className="waves-effect waves-light btn" onClick={this.newGame}>New Game</a>
        </div>;
    }
});

ReactDOM.render(
    <GameGrid />,
    document.getElementById('game-react-container')
);

function parseGameCellId(id) {
    const splitted = id.split('-');
    return [splitted[splitted.length - 2], splitted[splitted.length - 1]]
        .map(value => {
            return parseInt(value);
        });
}

function generateGameGrid(grid, rootComponent, winCoordinates) {
    return (
        <div className="game-grid">
            {generateGameRows(grid, rootComponent, winCoordinates)}
        </div>
    )
}

function generateGameRows(grid, rootComponent, winCoordinates) {
    return grid.map((row, rowNumber) => {
        return <div className="game-row" key={rowNumber}>
            {generateGameCells(row, rowNumber, rootComponent, winCoordinates)}
        </div>
    })
}

function generateGameCells(row, rowNumber, rootComponent, winCoordinates) {
    const COMMON_CELL_STYLES = 'game-cell card valign-wrapper';

    function cellStyle(isCellOccupied, cellPartOfWinCoordinates) {
        const myTurn = rootComponent.state.myTurn;
        const cellIsOccupied = isCellOccupied;
        const gameInProgress = rootComponent.state.gameState === gameStates.GAME_IN_PROGRESS;

        if (!gameInProgress) {

            if (cellPartOfWinCoordinates) {
                return `game-cell-winning ${COMMON_CELL_STYLES}`;
            }

            return COMMON_CELL_STYLES;
        }

        if (cellIsOccupied) {
            return `game-cell-disabled ${COMMON_CELL_STYLES}`; // gameInProgress && cellOccupied
        }

        if (myTurn) {
            return `hoverable ${COMMON_CELL_STYLES}`; // gameInProgress && !cellOccupied && myTurn
        }

        return COMMON_CELL_STYLES; // gameInProgress && !cellOccupied && !myTurn
    }

    return row.map((cell, columnNumber) => {
        const isCellOccupied = isCellFilled(cell);
        const cellPartOfWinCoordinates = arrayContainsArray([columnNumber, rowNumber], winCoordinates);

        return <div key={columnNumber} id={generateGameCellId(columnNumber, rowNumber)}
                    className={cellStyle(isCellOccupied, cellPartOfWinCoordinates)} onClick={rootComponent.cellClicked}>
            <span id={generateGameCellLabelId(columnNumber, rowNumber)}
                  className="game-cell-label center-align valign">{cell}</span>
        </div>
    });
}

/**
 * @param smallArray
 * @param [nestedArray]
 * @returns {boolean}
 */
function arrayContainsArray(smallArray, nestedArray) {
    if (!nestedArray) {
        return false;
    }
    return nestedArray.some(checkCoords => {
        return _.isEqual(smallArray, checkCoords);
    });
}

/**
 * @param {int} cell
 */
function isCellFilled(cell) {
    if (cell !== null) {
        return true;
    }
}

function generateGameCellId(i, j) {
    return `game-cell-${i}-${j}`;
}

function generateGameCellLabelId(i, j) {
    return `game-cell-label-${i}-${j}`;
}
