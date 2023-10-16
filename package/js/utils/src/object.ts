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
	for (let i = 1; i < args.length; i += 2) {
		obj[args[i]] = args[i + 1];
	}
	return {...obj}
}

export const clone = (obj:any) =>{
	return structuredClone ? structuredClone(obj): JSON.parse(JSON.stringify(obj));
}

