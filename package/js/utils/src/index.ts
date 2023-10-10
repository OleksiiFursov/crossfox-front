const u = undefined;
const _u = 'undefined';
const _P = '__proto__';

export * from './object';

export function isEmpty(v: any) {
	if (typeof v === 'string') {
		v = v.trim();
	}
	return v === null || v === u ||
		(v[_P].length !== u && !v.length) ||
		(v[_P].size !== u && !v.size);
}

export const isUndefined = (v: any) => typeof v === _u || v === _u;
export const isNull = (v: any) => v === null;
export const isString = (v: any) => typeof v === 'string';
export const isArray = Array.isArray;
export const isBoolean = (v: any) => typeof v === 'boolean' || ['true', 'false', '0', '1'].includes(("" + v).toLowerCase());
export const isFunction = (v: any) => typeof v === 'function'


export function checkType(prefix: string, name: string, value: any, type: (() => void) | string) {
	let isError: boolean;
	if (isString(type)) {
		isError = typeof value !== type
	} else {
		// @ts-ignore
		isError = type(value)!;
		type = (type as Function).name || 'Custom';
	}

	if (isError) {
		throw TypeError(prefix + ': ' + name + ' must be a ' + type)
	}
}


export function range(min: number, max: number, step: number | null) {
	const res = [];

	const inv = max <= min
	if (!step) {
		step = inv ? -1 : 1

	}

	for (; inv ? max <= min : min <= max; min += step) {
		res.push(min)
	}
	return res
}

export function parseJSON(str: string, def = {}) {
	if (!isString(str)) return def
	try {
		return JSON.parse(str)
	} catch (e) {
		return def
	}
}


export const maskValue = (v: string, mask: string, clearExp = /\s+|[^0-9]+/g) => {
	const clearValue = v.replace(clearExp, ''),
		len = clearValue.length

	let buf = ''
	for (let i = 0, j = 0; j < len && i < mask.length; i++) {
		buf += mask[i] === 'X' ? clearValue[j++] : mask[i]
	}

	return buf
}

export function classNames (...args:any[]) {
	return args.filter(v => v).join(' ')
}

