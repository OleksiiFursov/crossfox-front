import { checkType } from "@crossfox/utils"
import useInjectReducer from './injectReducer'
import useInjectSaga from './injectSaga'

function useInject (key:string, reducer:Function, saga:Function) {
	checkType('useInject', 'key', key, 'string')
	checkType('useInject', 'reducer', reducer, 'function')
	useInjectReducer(key, reducer)

	if (saga) {
		checkType('useInject', 'saga', saga, 'function')
		useInjectSaga(key, saga)
	}
}

export default useInject
