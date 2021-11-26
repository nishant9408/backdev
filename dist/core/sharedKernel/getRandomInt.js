"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomInt = void 0;
function getRandomInt(minInput, maxInput) {
    const min = Math.ceil(minInput);
    const max = Math.floor(maxInput);
    return Math.floor(Math.random() * (max - min)) + min;
}
exports.getRandomInt = getRandomInt;
//# sourceMappingURL=getRandomInt.js.map