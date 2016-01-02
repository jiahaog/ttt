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

const api = {
    deepCopy: deepCopy,
    getPossibleMoves: getPossibleMoves,
    prettyPrintGrid: prettyPrintGrid
};

export default api;
