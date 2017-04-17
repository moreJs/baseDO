'use strict';

import "reflect-metadata";
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { __globalDao__, reducer as R, epic as E } from './constant';

const factoryForWrite = (type: Symbol) => (name: string) => (target: any, propertyKey: string, descriptor: any) => {
    const metadata = Reflect.getOwnMetadata(type, __globalDao__) || new Map();
    metadata.set(name, descriptor.value);
    Reflect.defineMetadata(type, metadata, __globalDao__);
};

const factoryForRead = (type: Symbol, originFn: any) => () => {
    const metadata = Reflect.getOwnMetadata(type, __globalDao__);
    return originFn(metadata);
}


// 对外暴露的两个装饰器
export const reducer = factoryForWrite(R);
export const epic = factoryForWrite(E);


// 对外暴露构建store对象的方法
export const store = () => {
    const reduces = factoryForRead(R, combineReducers);
    const epics = factoryForRead(E, combineEpics);

    const epicMiddleware = createEpicMiddleware(epics);
    const enhancer = compose(
        applyMiddleware(epicMiddleware)
    );

    return createStore(
        reduces,
        enhancer
    );
}
