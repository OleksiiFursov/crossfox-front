import { isSimpleObject } from './index';
export function takeItem(arr: Record<string, any>, column: string, def = null) {
	const res = arr[column] || def
	delete arr[column]
	return res
}
export const crop = (obj: Record<string, any>, keys: string[], isDelete = false) => {
	const arr: Record<string, any> = {}
	for (const key of keys) {
		arr[key] = obj[key]
		if (isDelete)
			delete obj[key]
	}
	return arr
}
export const setObject = (obj:Record<string, any>) => (...args:any) => {
	for (let i = 0; i < args.length; i += 2) {
		obj[args[i]] = args[i + 1];
	}
	return {...obj}
}

export function merge(target:Record<any, any>, ...sources:any[]) {
	if (!sources.length) return target;
	const source = sources.shift();

	if (isSimpleObject(target) && isSimpleObject(source)) {
		for (const key in source) {
			if (isSimpleObject(source[key])) {
				if (!target[key]) Object.assign(target, { [key]: {} });
				merge(target[key], source[key]);
			} else {
				Object.assign(target, { [key]: source[key] });
			}
		}
	}
	return merge(target, ...sources);
}


export const clone = (obj:any) =>{
	return structuredClone ? structuredClone(obj): JSON.parse(JSON.stringify(obj));
}

