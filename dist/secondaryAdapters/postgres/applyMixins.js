"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyMixins = void 0;
function setProps(props, base) {
    return Object.keys(props).reduce((acc, prop) => (Object.assign(Object.assign({}, acc), { [prop]: base[prop] })), Object(null));
}
function applyMixins(instances) {
    return instances.reduce((acc, inst) => (Object.assign(Object.assign(Object.assign({}, acc), setProps(Object.getOwnPropertyDescriptors(inst), inst)), setProps(Object.getOwnPropertyDescriptors(Object.getPrototypeOf(inst)), inst))), Object(null));
}
exports.applyMixins = applyMixins;
//# sourceMappingURL=applyMixins.js.map