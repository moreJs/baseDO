'use strict';
exports.mapToObject = map => {
    let obj = {};
    for (let [k, v] of map) {
        obj[k] = v;
    }
    return obj;
};
exports.mapToValues = map => {
    let value = [...map.values()];
    return value;
};
exports.defaultResponseProcesser = {
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
//# sourceMappingURL=util.js.map