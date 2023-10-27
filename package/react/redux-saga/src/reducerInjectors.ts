import createReducer from '../reducers'
import {Store} from 'redux';
export function injectReducerFactory (store:Store<any, any>) {
  return function injectReducer(key:string, reducer:Function) {

	  if (Reflect.has(store.injectedReducers, key) && store.injectedReducers[key] === reducer)
      return;

	  store.injectedReducers[key] = reducer
    store.replaceReducer(createReducer(store.injectedReducers));
  };
}

export default function getInjectors(store) {
  return {
	  injectReducer: injectReducerFactory(store),
  };
}
