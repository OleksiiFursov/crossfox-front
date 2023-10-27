export interface iStoreInjected {
	injectedSagas: Record<string, any>,
}

export interface IConfigureStore{
	initial?: Record<string, any>,
	reducers?: Record<string, Function>,
	sagas?: Record<string, Function>
	enableSaga?: boolean,
	devTools?: boolean
	saveStore?: boolean|string[]
}
