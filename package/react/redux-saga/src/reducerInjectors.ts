import createReducer from '../reducers'

export function injectReducerFactory (store) {
  return function injectReducer(key, reducer) {

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
