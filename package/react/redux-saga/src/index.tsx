import {isEmpty} from "@crossfox/utils";
import {createSelector} from 'reselect'
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

