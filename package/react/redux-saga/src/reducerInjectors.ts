import {Store} from 'redux';
import {createReducer} from "./index";

export function injectReducerFactory (store:Store<any, any>) {
  return function injectReducer(key:string, reducer:Function) {

      //@ts-ignore
	  if (Reflect.has(store.injectedReducers, key) && store.injectedReducers[key] === reducer)  return;
      //@ts-ignore
	  store.injectedReducers[key] = reducer
      //@ts-ignore
    store.replaceReducer(createReducer(store.injectedReducers));
  };
}

export default function getInjectors(store:any) {
  return {
	  injectReducer: injectReducerFactory(store),
  };
}
