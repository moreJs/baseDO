'use strict';

export const mapToObject = map => {
    let obj = {};
    for(let [k,v] of map) {
        obj[k] = v;
    }
    return obj;
}

export const mapToValues = map => {
    let value = [...map.values()];
    if(value.length == 1) {
        return value[0];
    }
    return value;
}