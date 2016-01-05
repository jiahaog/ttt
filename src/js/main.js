import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import reactUpdate from 'react-addons-update';
import _ from 'underscore';

import gameApi from './game/index.js';
const PerfectPlayer = gameApi.players.PerfectPlayerWeb;
const Player = gameApi.players.Player;

const gameStates = {
    CHOOSE_PLAYER: 'STATE_CHOOSE_PLAYER',
    GAME_IN_PROGRESS: 'STATE_GAME_IN_PROGRESS',
    GAME_OVER: 'STATE_GAME_OVER'
};

const emptyGrid = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

const newGameReactState = {
    gameState: gameStates.CHOOSE_PLAYER,
    myTurn: false,
    winnerName: null,
    winCoordinates: null
};

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = _.clone(newGameReactState);
        this.state.gameGrid = _.clone(emptyGrid);
    }

    onCellClick = (event) => {
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
    }

    newGame = () => {
        this.setState(_.clone(newGameReactState));
    }

    choosePlayer = (event) => {
        this.newGame();
        const playerChosen = parseInt(event.target.dataset.player);

        const game = new gameApi.TicTacToe();
        const aiPlayer = new PerfectPlayer(game, 'AI-Player');
        const clientPlayer = new Player(game, 'You');

        clientPlayer.onBoardChange(grid => {
            const newState = newBoardState(this.state.gameGrid, grid);
            this.setState({
                gameGrid: newState
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
    }

    maybeShowWinnerText = () => {
        if (this.state.gameState !== gameStates.GAME_OVER) {
            return;
        }

        const winnerName = this.state.winnerName;

        let winnerText;
        if (winnerName === 'draw') {
            winnerText = 'draw';
        } else {
            winnerText = 'You Lose';
        }

        return <div className="game-winner-text page-text center-align">
            {winnerText}
        </div>
    }

    maybeShowLoader = () => {
        if (this.state.myTurn || this.state.gameState !== gameStates.GAME_IN_PROGRESS) {
            return ''
        }
        return preloader();
    }

    generateGameGrid = () => {
        return generateGameGrid(this.state.gameGrid, this.state.myTurn, this.state.gameState, this.state.winCoordinates, this.onCellClick);
    }

    render() {
        return <div className="tall-container-grow">
            <div className="game-button-group center-align">
                <a className="game-button waves-effect waves-teal btn-flat" data-player="0" onClick={this.choosePlayer}>Start First</a>
                <a className="game-button waves-effect waves-teal btn-flat" data-player="1" onClick={this.choosePlayer}>Start Second</a>
            </div>
            {this.generateGameGrid()}
            <div className="game-footer">
                <ReactCSSTransitionGroup transitionName="animate" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                    {this.maybeShowLoader()}
                    {this.maybeShowWinnerText()}
                </ReactCSSTransitionGroup>
            </div>
        </div>;
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('game-react-container')
);

function parseGameCellId(id) {
    const splitted = id.split('-');
    return [splitted[splitted.length - 2], splitted[splitted.length - 1]]
        .map(value => {
            return parseInt(value);
        });
}

function generateGameGrid(grid, isMyTurn, gameState, winCoordinates, onClickCallback) {
    const GRID_DEFAULT_STYLES = 'game-grid center-align tall-container-grow';
    let gridStyle;
    if (gameState === gameStates.CHOOSE_PLAYER) {
        gridStyle = `game-cell-disabled ${GRID_DEFAULT_STYLES}`;
    } else {
        gridStyle = GRID_DEFAULT_STYLES;
    }
    return <div className={gridStyle}>
            {generateGameRows(grid, isMyTurn, gameState, winCoordinates, onClickCallback)}
        </div>
}

function generateGameRows(grid, isMyTurn, gameState, winCoordinates, onClickCallback) {
    return grid.map((row, rowNumber) => {
        return <div className="game-row" key={rowNumber}>
            {generateGameCells(row, rowNumber, isMyTurn, gameState, winCoordinates, onClickCallback)}
        </div>
    })
}

function generateGameCells(row, rowNumber, isMyTurn, gameState, winCoordinates, onClickCallback) {
    const COMMON_CELL_STYLES = 'game-cell card valign-wrapper';

    function cellStyle(isCellOccupied, cellPartOfWinCoordinates) {
        const cellIsOccupied = isCellOccupied;
        const gameInProgress = gameState === gameStates.GAME_IN_PROGRESS;

        if (!gameInProgress) {

            if (cellPartOfWinCoordinates) {
                return `game-cell-winning ${COMMON_CELL_STYLES}`;
            }

            return COMMON_CELL_STYLES;
        }

        if (cellIsOccupied) {
            return COMMON_CELL_STYLES; // gameInProgress && cellOccupied
        }

        if (isMyTurn) {
            return `hoverable ${COMMON_CELL_STYLES}`; // gameInProgress && !cellOccupied && myTurn
        }

        return COMMON_CELL_STYLES; // gameInProgress && !cellOccupied && !myTurn
    }

    return row.map((cellMarker, columnNumber) => {
        const isCellOccupied = isCellFilled(cellMarker);
        const cellPartOfWinCoordinates = arrayContainsArray([columnNumber, rowNumber], winCoordinates);

        return <div key={columnNumber} id={generateGameCellId(columnNumber, rowNumber)}
                    className={cellStyle(isCellOccupied, cellPartOfWinCoordinates)} onClick={onClickCallback}>
            <ReactCSSTransitionGroup transitionName="animate" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                {generateGameCell(columnNumber, rowNumber, cellMarker)}
            </ReactCSSTransitionGroup>
        </div>
    });
}

function generateGameCell(columnNumber, rowNumber, cellText) {
    if (cellText === null) {
        return ''
    }

    if (cellText === 1) {
        return  <span id={generateGameCellLabelId(columnNumber, rowNumber)}
                      className="game-cell-label center-align valign">
                    ◯
        </span>
    }

    return  <span id={generateGameCellLabelId(columnNumber, rowNumber)}
                  className="game-cell-label center-align valign">
                    ╳
    </span>

}

function newBoardState(oldGrid, newGrid) {
    return reactUpdate(oldGrid, {$merge: newGrid});
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

function preloader() {
    return <div className="center-align row">
        <div className="preloader-wrapper active">
            <div className="spinner-layer">
                <div className="circle-clipper left">
                    <div className="circle"></div>
                </div><div className="gap-patch">
                <div className="circle"></div>
            </div><div className="circle-clipper right">
                <div className="circle"></div>
            </div>
            </div>
        </div>
    </div>
}
