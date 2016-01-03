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
    winnerName: null
};

let GameGrid = React.createClass({
    getInitialState: function () {
        return _.clone(newGameReactState);
    },
    cellClicked: function (event) {
        if (!this.state.myTurn) {
            return;
        }

        const cellId = event.target.id;
        const cellCoordinates = parseGameCellId(cellId);

        this.setState({
            myTurn: false
        });

        this.state.player.makeMove(cellCoordinates);
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
                winnerName: winnerData.winnerName
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
        return generateGameGrid(this.state.gameGrid, this);
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

function generateGameGrid(grid, rootComponent) {
    return (
        <div className="game-grid">
            {generateGameRows(grid, rootComponent)}
        </div>
    )
}

function generateGameRows(grid, rootComponent) {
    return grid.map((row, rowNumber) => {
        return <div className="game-row" key={rowNumber}>
            {generateGameCells(row, rowNumber, rootComponent)}
        </div>
    })
}

function generateGameCells(row, rowNumber, rootComponent) {
    const COMMON_CELL_STYLES = 'game-cell card valign-wrapper';

    function cellStyle(isCellOccupied) {
        const myTurn = rootComponent.state.myTurn;
        const cellIsOccupied = isCellOccupied;
        const gameInProgress = rootComponent.state.gameState === gameStates.GAME_IN_PROGRESS;

        if (!gameInProgress) {
            return COMMON_CELL_STYLES;
        }

        if (cellIsOccupied ) {
            return `game-cell-disabled ${COMMON_CELL_STYLES}`; // gameInProgress && cellOccupied
        }

        if (myTurn) {
            return `hoverable ${COMMON_CELL_STYLES}`; // gameInProgress && !cellOccupied && myTurn
        }

        return COMMON_CELL_STYLES; // gameInProgress && !cellOccupied && !myTurn
    }

    return row.map((cell, columnNumber) => {
        const isCellOccupied = isCellFilled(cell);
        return <div key={columnNumber} id={generateGameCellId(columnNumber, rowNumber)}
                    className={cellStyle(isCellOccupied)} onClick={rootComponent.cellClicked}>
            <span id={generateGameCellLabelId(columnNumber, rowNumber)}
                  className="game-cell-label center-align valign">{cell}</span>
        </div>
    })
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
