import {memo, useEffect, useRef} from 'react';
import {iRouterConfig} from "./types";

export function createRouter(routers:iRouter, config:iRouterConfig){
	const url = config.url || location.pathname;
	const layouts = config.layouts || {};

	for (const path in routers) {

		const regExp = new RegExp('^'+path+'$');
		if(~url.search(regExp)){
			const match = url.match(regExp);


			let Component, params={}, configRouter={};
			if(Array.isArray(routers[path])){
				const router = clone(routers[path]);
				Component = router[0];
				if(typeof router.at(-1) === 'object'){
					configRouter = router.pop();
				}
				for(let i=1; i<match.length; i++){
					params[router[i]] = match[i];
				}
			}else{
				Component = routers[path];
			}
			const currentLayout = configRouter.layout || config.layout;
			if(currentLayout !== layoutState){
				dispatch(changeLayout(currentLayout));
			}
			const Layout = layouts[currentLayout];
			return (<Layout>
				<Component {...props.globals} {...params} />
			</Layout>);
		}
	}
	const Component = routers[404];
	const Layout = layouts[config.layoutError];
	return <Layout><Component {...props.globals} /></Layout>;
}
