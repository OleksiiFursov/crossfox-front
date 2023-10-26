import {isEmpty, parseJSON} from "@crossfox/utils";
import {createSelector} from 'reselect'
import {useContext, useLayoutEffect} from "react";
import {ReactReduxContext} from 'react-redux'
import getInjectors from './sagaInjectors';

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


export const loadState = (state: string, keyReset = [], resetValue=false) => {
	const res = parseJSON(localStorage[state]) || undefined
	if (typeof res === 'object') {
		for (const key in keyReset) {
			if (res[key])
				res[key] = typeof res[key] === 'object' ? {} : resetValue;
		}
	}
	return res
}

export const saveState = (key: string, state: any) => localStorage[key] = JSON.stringify(state)

export const clearState = (localStorageClear = true) => {
	const locale = localStorage['lang']
	if (localStorageClear) {
		localStorage.clear()
	}
	localStorage['actionClear'] = 1
	localStorage['lang'] = locale
}

export function useInjectSaga(key: string, saga: Function, mode = 'daemon') {
	const context = useContext(ReactReduxContext)
	useLayoutEffect(() => {
		const injectors = getInjectors(context.store);
		injectors.injectSaga(key, saga, mode)

		return () => {
			injectors.ejectSaga(key);
		};
	}, []);
}
