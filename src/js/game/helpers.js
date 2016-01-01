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

const api = {
    deepCopy: deepCopy,
    prettyPrintGrid: prettyPrintGrid
};

export default api;
