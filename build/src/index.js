'use strict';
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
const ajax_1 = require("rxjs/observable/dom/ajax");
require("rxjs/add/operator/mergeMap");
require("rxjs/add/operator/map");
require("reflect-metadata");
const redux_1 = require("redux");
const redux_observable_1 = require("redux-observable");
const constant_1 = require("./constant");
const util_1 = require("./util");
const fetchGenerator = (config = {}) => {
    const finallyConfig = __assign({}, util_1.defaultResponseProcesser, config);
    return actions$ => actions$.ofType(finallyConfig.filter_type)
        .mergeMap(action => {
        return ajax_1.ajax.getJSON(finallyConfig.url);
    })
        .map(response => {
        if (finallyConfig.isError(response)) {
            return {
                type: finallyConfig.error_action_type,
                payload: response
            };
        }
        else {
            return {
                type: finallyConfig.sucess_action_type,
                payload: finallyConfig.result(response)
            };
        }
    });
};
const factoryForWrite = (type, needGenerator) => (name, config) => (target, propertyKey, descriptor) => {
    const metadata = Reflect.getOwnMetadata(type, constant_1.__globalDao__) || new Map();
    let value = null;
    if (needGenerator) {
        value = fetchGenerator(config);
    }
    else {
        value = descriptor.value;
    }
    metadata.set(name, value);
    Reflect.defineMetadata(type, metadata, constant_1.__globalDao__);
};
const factoryForRead = (type, originFn, transform) => {
    const metadata = Reflect.getOwnMetadata(type, constant_1.__globalDao__);
    const transformData = transform(metadata) || [];
    return originFn(...transformData);
};
// 对外暴露的装饰器
exports.reducer = factoryForWrite(constant_1.reducer);
exports.epic = factoryForWrite(constant_1.epic);
exports.fetch = factoryForWrite(constant_1.epic, true);
// 对外暴露构建store对象的方法
exports.store = () => {
    const reduces = factoryForRead(constant_1.reducer, redux_1.combineReducers, util_1.mapToObject);
    const epics = factoryForRead(constant_1.epic, redux_observable_1.combineEpics, util_1.mapToValues);
    const epicMiddleware = redux_observable_1.createEpicMiddleware(epics);
    const enhancer = redux_1.compose(redux_1.applyMiddleware(epicMiddleware));
    return redux_1.createStore(reduces, enhancer);
};
//# sourceMappingURL=index.js.map