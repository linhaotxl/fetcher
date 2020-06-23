export function awaitWrap(promise) {
    return promise
        .then(data => [null, data], (err) => [err, null]);
}
//# sourceMappingURL=awaitWrap.js.map