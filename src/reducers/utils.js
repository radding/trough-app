
let cloneState = (state) => {
    return JSON.parse(JSON.stringify(state));
}

export {
    cloneState
};