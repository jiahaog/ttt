import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
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
    gameGrid: emptyGrid,
    winnerName: null,
    winCoordinates: null
};

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = _.clone(newGameReactState);
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
        return <div>
            <div className="game-button-group center-align row">
                <a className="game-button waves-effect waves-teal btn-flat" data-player="0" onClick={this.choosePlayer}>Start First</a>
                <a className="game-button waves-effect waves-teal btn-flat" data-player="1" onClick={this.choosePlayer}>Start Second</a>
            </div>
            {this.generateGameGrid()}
            <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                {this.maybeShowLoader()}
            </ReactCSSTransitionGroup>
            {this.maybeShowWinnerText()}
        </div>;
    }
}

//let GameGrid = React.createClass({
//
//});
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
    let gridStyle;
    if (gameState === gameStates.CHOOSE_PLAYER) {
        gridStyle = 'game-cell-disabled game-grid';
    } else {
        gridStyle = 'game-grid';
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
            return `waves-effect waves-teal hoverable ${COMMON_CELL_STYLES}`; // gameInProgress && !cellOccupied && myTurn
        }

        return COMMON_CELL_STYLES; // gameInProgress && !cellOccupied && !myTurn
    }

    return row.map((cell, columnNumber) => {
        const isCellOccupied = isCellFilled(cell);
        const cellPartOfWinCoordinates = arrayContainsArray([columnNumber, rowNumber], winCoordinates);

        return <div key={columnNumber} id={generateGameCellId(columnNumber, rowNumber)}
                    className={cellStyle(isCellOccupied, cellPartOfWinCoordinates)} onClick={onClickCallback}>
            <span id={generateGameCellLabelId(columnNumber, rowNumber)}
                  className="game-cell-label center-align valign">{gridText(cell)}</span>
        </div>
    });
}

function gridText(text) {
    if (text === null) {
        return '';
    }

    if (text === 1) {
        return <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
            <div className="cell-marker">◯</div>
        </ReactCSSTransitionGroup>
    } else {
        return <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
            <div className="cell-marker">╳</div>
        </ReactCSSTransitionGroup>
    }
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
