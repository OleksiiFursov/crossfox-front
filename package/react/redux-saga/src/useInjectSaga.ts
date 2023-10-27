import { useContext, useLayoutEffect } from 'react'
import { ReactReduxContext } from 'react-redux'

import getInjectors from './sagaInjectors'

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

export default useInjectSaga
