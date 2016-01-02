import React from 'react';
import ReactDOM from 'react-dom';

import gameApi from './game/index.js';
const PerfectPlayer = gameApi.players.PerfectPlayer;
const Player = gameApi.players.Player;


let GameGrid = React.createClass({
    getInitialState: function () {
        return {
            gameStarted: false
        }
    },
    cellClicked: function (event) {
        if (this.state.gridDisabled) {
            return;
        }

        const cellId = event.target.id;
        const cellCoordinates = parseGameCellId(cellId);

        this.setState({
            gridDisabled: true
        });

        this.state.player.makeMove(cellCoordinates);
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
                gridDisabled: false
            });
        });

        clientPlayer.onGameOver((winner, winnerName) => {
            this.setState({
                winnerName: winnerName
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
            gameStarted: true,
            player: clientPlayer
        });
    },
    winnerText: function () {
        let winnerName = this.state.winnerName;
        if (!winnerName) {
            return;
        }

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
    render: function () {
        if (!this.state.gameStarted) {
            return <div>
                <a className="waves-effect waves-light btn" data-player="0" onClick={this.choosePlayer}>Start First</a>
                <a className="waves-effect waves-light btn" data-player="1" onClick={this.choosePlayer}>Start Second</a>
            </div>
        }

        return <div>
            {generateGameGrid(this.state.gameGrid, this)}
            <div>{this.state.currentPlayer}</div>
            <div>{this.state.playerChosen}</div>
            {this.winnerText()}
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
    return row.map((cell, columnNumber) => {
        return <div key={columnNumber} id={generateGameCellId(columnNumber, rowNumber)}
                    className="game-cell card valign-wrapper hoverable" onClick={rootComponent.cellClicked}>
            <span id={generateGameCellLabelId(columnNumber, rowNumber)}
                  className="game-cell-label center-align valign">{cell}</span>
        </div>
    })
}

function generateGameCellId(i, j) {
    return `game-cell-${i}-${j}`;
}

function generateGameCellLabelId(i, j) {
    return `game-cell-label-${i}-${j}`;
}
