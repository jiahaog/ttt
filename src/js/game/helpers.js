import _ from 'underscore';

function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function prettyPrintGrid(grid) {
    const gridString = JSON.stringify(grid);
    const result = gridString
        .replace(/],/g, ']\n') // split into multiple lines
        .replace(/[\[|\]]/g, '') // remove all brackets
        .replace(/,/g, '  '); // remove commas
    console.log(result);
}

function getPossibleMoves(grid) {
    const possibleMoves = [];
    for (var j = 0; j < grid.length; j++) {
        let row = grid[j];

        for (var i = 0; i < row.length; i++) {
            var point = row[i];
            if (point === null) {
                possibleMoves.push([i, j]);
            }
        }
    }
    return possibleMoves;
}

function isGridEmpty(grid) {
    return !grid.some(row => {
        return row.some(cell => {
            return cell !== null;
        });
    });
}

function getCornerFromGrid(grid) {
    // grid assumed to be square
    return getCornerCoordinates(grid.length);
}

function getCornerCoordinates(length) {
    let corners = [
        [0, 0],
        [length - 1, 0],
        [length -1, length - 1],
        [0, length - 1]
    ];

    return _.sample(corners);
}

const api = {
    deepCopy: deepCopy,
    getCornerFromGrid: getCornerFromGrid,
    getPossibleMoves: getPossibleMoves,
    isGridEmpty: isGridEmpty,
    prettyPrintGrid: prettyPrintGrid
};

export default api;
