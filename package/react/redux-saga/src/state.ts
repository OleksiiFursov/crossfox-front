import {isArray, isSimpleObject, parseJSON} from "@crossfox/utils";

const stateData = ():string[] => (localStorage['fc-state'] || '').split(';');

export const loadState = (state: string, keyReset = [], resetValue=false) => {
    const res = parseJSON(localStorage[state], undefined)
    if (typeof res === 'object') {
        for (const key in keyReset) {
            if (res[key])
                res[key] = isSimpleObject(res[key]) ? {} : isArray(res[key]) ? []: resetValue;
        }
    }
    return res
}
export const saveState = (key: string, state: any) => {
    localStorage[key] = JSON.stringify(state);
    const s = new Set(stateData());
    s.add(key);

    localStorage['fc-state'] = [...s];
}

export const clearState = (exclude:string[]=[]) => {
    for(const item of stateData()){
        if(!exclude.includes(item))
            localStorage.removeItem(item);
    }
}

