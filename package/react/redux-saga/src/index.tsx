import {isEmpty} from "@crossfox/utils";
import {createSelector} from 'reselect'
import {configureStore as configureStoreOrigin, EnhancedStore} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import {IConfigureStore} from "./types";
import {combineReducers} from "redux";
import React, {FC} from "react";
import {Provider} from "react-redux";

export * from './state';
export {default as useInjectSaga} from './useInjectSaga';
export {default as useInjectReducer} from './useInjectReducer';
export {default as useInject} from './useInjectReducerSaga';

export function action(type: string, ...keys: string[]) {
    const res: Record<string, any> = {type}
    return (...args: any[]) => {
        for (const index in keys) {
            res[keys[index]] = args[index]
        }
        return res
    }
}

export function selectContext(name: string, def = {}) {
    const context = (state: Record<string, any> = {}) => {
        if (isEmpty(state[name])) return def
        return state[name]
    }

    return (field: string | Function, def = null) => createSelector(
        context,
        state => (typeof field === 'function' ? field(state) : state[field]) || def,
    )
}


let reducerGlobal = {};

export function createReducer(injectedReducers = {}) {
    return combineReducers({
        ...reducerGlobal,
        ...injectedReducers,
    });
}


export function configureStore(props: IConfigureStore) {
    const {initial = {}, reducers = {}, devTools = true, sagas = {}} = props;
    const sagaMiddleware = createSagaMiddleware(sagas);

    reducerGlobal = reducers;
    const store: EnhancedStore = configureStoreOrigin({
        reducer: createReducer(),
        preloadedState: initial,
        middleware: [sagaMiddleware],
        devTools,
    });

    // Extensions
    //@ts-ignore
    store.runSaga = sagaMiddleware.run;
    //@ts-ignore
    store.injectedReducers = {}; // Reducer registry
    //@ts-ignore
    store.injectedSagas = {}; // Saga registry

    return store;
}

export default function initStore(props: IConfigureStore = {}) {
    const store = configureStore(props || {});

    return ({children}: any) => <Provider store={store}>
        {children}
    </Provider>
}
