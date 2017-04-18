'use strict';

export const mapToObject = map => {
    let obj = {};
    for(let [k,v] of map) {
        obj[k] = v;
    }
    return obj;
}