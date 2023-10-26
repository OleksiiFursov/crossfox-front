const availableMode = ['restart-on-remount', 'daemon', 'once-till-unmount']

export function injectSagaFactory (store) {
	return function injectSaga (key:string, saga:Function, mode:string, args = {}) {

		if (!availableMode.includes(mode)) {
			return console.error('injectSaga: mode is not available. Mode: ' + mode + '. Available: ' + availableMode + '.')
		}
		const newDescriptor = { saga, mode }

		let hasSaga = Reflect.has(store.injectedSagas, key)

		if (process.env.NODE_ENV !== 'production') {
			const oldDescriptor = store.injectedSagas[key]
			if (hasSaga && oldDescriptor.saga !== saga) {
				oldDescriptor.task.cancel()
				hasSaga = false
			}
		}

		if (!hasSaga || (hasSaga && mode !== 'daemon' && mode !== 'once-till-unmount')) {
			store.injectedSagas[key] = {
				...newDescriptor,
				task: store.runSaga(saga, args),
			}
		}
	}
}

export function ejectSagaFactory (store:any) {
	return function ejectSaga (key:string) {
		if (Reflect.has(store.injectedSagas, key)) {
			const descriptor = store.injectedSagas[key]
			if (descriptor.mode && descriptor.mode !== 'daemon') {
				descriptor.task.cancel()
				// Clean up in production; in development we need `descriptor.saga` for hot reloading
				if (process.env.NODE_ENV === 'production') {
					// Need some value to be able to detect `'once-till-unmount'` sagas in `injectSaga`
					store.injectedSagas[key] = 'done'
				}
			}
		}
	}
}

export default function (store) {
	return {
		injectSaga: injectSagaFactory(store),
		ejectSaga: ejectSagaFactory(store),
	}
}
