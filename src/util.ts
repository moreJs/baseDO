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

export const defaultResponseProcesser = {
    filter_type: '@@pleace_holder@@',
    sucess_action_type: '@@pleace_holder@@',
    error_action_type: '@@pleace_holder@@',
    url: '@@pleace_holder@@',
    isSuccess: response => {
        return response && response.suceess;
    },
    isError: response => {
        return response && response.error;
    },
    result: response => {
        return response && response.body;
    }
};