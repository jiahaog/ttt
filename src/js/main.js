import React from 'react';
import ReactDOM from 'react-dom';

import api from './game/index.js';

let game = new api.TicTacToe();
console.log('game created');

let GameGrid = React.createClass({
    getInitialState: function () {
        return {
            ready: true,
            yourTurn: true
        }
    },
    cellClicked: function (event) {
        const cellId = event.target.id;
        const cellCoordinates = parseGameCellId(cellId);
        console.log(cellCoordinates)
    },
    render: function () {
        const grid = [
            [null, 1, null],
            [null, null, 1],
            [0, 0, 1]
        ];
        return generateGameGrid(grid, this);
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
