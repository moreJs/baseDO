'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToObject = map => {
    let obj = {};
    for (let [k, v] of map) {
        obj[k] = v;
    }
    return obj;
};
exports.mapToValues = map => {
    let value = [...map.values()];
    if (value.length == 1) {
        return value[0];
    }
    return value;
};
//# sourceMappingURL=util.js.map