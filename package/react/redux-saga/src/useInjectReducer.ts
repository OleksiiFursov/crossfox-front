import { useContext, useLayoutEffect } from 'react'
import { ReactReduxContext } from 'react-redux'

import getInjectors from './reducerInjectors'

export default function useInjectReducer (key:string, reducer:Function) {
	const context = useContext(ReactReduxContext)
	useLayoutEffect(() => {
		getInjectors(context.store).injectReducer(key, reducer)
	}, [])
}

