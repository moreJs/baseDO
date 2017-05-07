'use strict';

import { ajax } from 'rxjs/observable/dom/ajax';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

import "reflect-metadata";


import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { __globalDao__, reducer as R, epic as E } from './constant';
import { mapToObject, mapToValues, defaultResponseProcesser } from './util';


const fetchGenerator = (config = {} , metadata) => {

    const finallyConfig = {
        ...defaultResponseProcesser,
        ...config
    };

    return actions$ => 
        actions$.ofType(finallyConfig.filter_type)
                .mergeMap(action => {
                    return ajax.getJSON(finallyConfig.url)
                })
                .map(response => {
                    if(finallyConfig.isError(response)) {
                        return {
                            type: finallyConfig.error_action_type,
                            payload: response
                        }
                    }else {
                        return {
                            type: finallyConfig.sucess_action_type,
                            payload: finallyConfig.result(response)
                        }
                    }
                })
}


const factoryForWrite = (type: Symbol, needGenerator?: boolean) => (name: string, config: Object) => (target: any, propertyKey: string, descriptor: any) => {
    const metadata = Reflect.getOwnMetadata(type, __globalDao__) || new Map();
    let value = null;

    if(needGenerator) {
        value = fetchGenerator(config, metadata);
    }else {
        value = descriptor.value;
    }
    
    metadata.set(name, value);
    Reflect.defineMetadata(type, metadata, __globalDao__);
};

const factoryForRead = (type: Symbol, originFn: any, transform: (origin:any) => {}) => {
    const metadata = Reflect.getOwnMetadata(type, __globalDao__);
    return originFn(transform(metadata));
}



// 对外暴露的装饰器
export const reducer = factoryForWrite(R);
export const epic = factoryForWrite(E);
export const fetch = factoryForWrite(E, true);



// 对外暴露构建store对象的方法
export const store = () => {
    const reduces = factoryForRead(R, combineReducers, mapToObject);
    const epics = factoryForRead(E, combineEpics, mapToValues);


    const epicMiddleware = createEpicMiddleware(epics);
    const enhancer = compose(
        applyMiddleware(epicMiddleware)
    );

    return createStore(
        reduces,
        enhancer
    );
}
