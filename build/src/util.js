'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToObject = map => {
    let obj = {};
    for (let [k, v] of map) {
        obj[k] = v;
    }
    return obj;
};
//# sourceMappingURL=util.js.map