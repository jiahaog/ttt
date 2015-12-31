function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

const api = {
    deepCopy: deepCopy
};

export default api;