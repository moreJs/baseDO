'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const redux_1 = require("redux");
const redux_observable_1 = require("redux-observable");
const constant_1 = require("./constant");
const util_1 = require("./util");
const factoryForWrite = (type) => (name) => (target, propertyKey, descriptor) => {
    const metadata = Reflect.getOwnMetadata(type, constant_1.__globalDao__) || new Map();
    metadata.set(name, descriptor.value);
    Reflect.defineMetadata(type, metadata, constant_1.__globalDao__);
};
const factoryForRead = (type, originFn) => () => {
    const metadata = Reflect.getOwnMetadata(type, constant_1.__globalDao__);
    return originFn(util_1.mapToObject(metadata));
};
// 对外暴露的两个装饰器
exports.reducer = factoryForWrite(constant_1.reducer);
exports.epic = factoryForWrite(constant_1.epic);
// 对外暴露构建store对象的方法
exports.store = () => {
    const reduces = factoryForRead(constant_1.reducer, redux_1.combineReducers);
    const epics = factoryForRead(constant_1.epic, redux_observable_1.combineEpics);
    const epicMiddleware = redux_observable_1.createEpicMiddleware(epics);
    const enhancer = redux_1.compose(redux_1.applyMiddleware(epicMiddleware));
    return redux_1.createStore(reduces, enhancer);
};
//# sourceMappingURL=index.js.map