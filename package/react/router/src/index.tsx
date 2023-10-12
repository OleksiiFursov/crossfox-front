//import React, {memo, useEffect, useRef} from 'react';
import {iRouterConfig} from "./types";
import {isSimpleObject} from "@crossfox/utils";

//const TypeRouter: Function | any[] | object = {};

const regSlug = /:([a-zA-Z0-9-]+)/g;
const regDef = /.+/;

const normalizeItem = (key: string, item: any[],  root: any[]): void => {
	const isConfig = isSimpleObject(item.at(-1));
	const countSlug = key.match(regSlug)?.length || 0;
	if (countSlug > item.length - 1 + root.length + (isConfig ? -1 : 0)) {
		item.push(regDef);
		console.log(1, key, countSlug, item.length - 1, root.length, (isConfig ? -1 : 0));
	} else {
		console.log(0, key, countSlug, item.length - 1, root.length, (isConfig ? -1 : 0));
	}
}
function normalizeRouter(obj: Record<string, any>, prefix = '/', root = []) {
	let res: Record<string, any> = {};
	for (let key in obj) {
		if (key === '$root') continue;

		let item: any = obj[key];
		//	const slugNames = [];


		const itemFunc = typeof item === 'function';
		const isArray = Array.isArray(item);


		if (isArray || itemFunc) {
			if (!isArray) {
				item = [item];
			}
			normalizeItem(key, item, root);
			item.splice(1, 0, ...root)

			// if (isArray) {
			// 	item.splice(1, 0, ...root)
			// } else {
			// 	item = [item, ...root]
			// }


			//const regExpItem = isArray ? [item.slice(1)] : [];

			// key = key.replace(/:([a-zA-Z0-9-]+)/g, (_: string, slug: string) => {
			// 	slugNames.push(slug);
			// 	console.log(1, regExpItem.shift());
			// 	let getRegExp = ((regExpItem.shift() || '') + '').slice(1, -1);
			// 	return '(' + (getRegExp || '.+') + ')';
			// });

			res[prefix + key] = item;
		} else {
			//const rootChildren = item.$root;
			normalizeItem(key, item.$root, root);
			Object.assign(res, normalizeRouter(item, prefix + key + '/', item.$root || []));
		}
	}
	return res;
}


export function createRouter(routers: any, config: iRouterConfig = {}) {
	console.log(normalizeRouter(routers))

	//Config
	// let routeConfig = {};
	// if(item.length){
	// 	if(typeof item.at(-1) === 'object'){
	// 		routeConfig = item.pop();
	// 	}
	// }
	return '';
	//const url = config.url || location.pathname;
//	const layouts = config.layouts || {};

	// for (const path in routers) {
	//
	// 	const regExp = new RegExp('^'+path+'$');
	// 	if(~url.search(regExp)){
	// 		const match = url.match(regExp);
	//
	//
	// 		let Component, params={}, configRouter={};
	// 		if(Array.isArray(routers[path])){
	// 			const router = clone(routers[path]);
	// 			Component = router[0];
	// 			if(typeof router.at(-1) === 'object'){
	// 				configRouter = router.pop();
	// 			}
	// 			for(let i=1; i<match.length; i++){
	// 				params[router[i]] = match[i];
	// 			}
	// 		}else{
	// 			Component = routers[path];
	// 		}
	// 		const currentLayout = configRouter.layout || config.layout;
	// 		if(currentLayout !== layoutState){
	// 			dispatch(changeLayout(currentLayout));
	// 		}
	// 		const Layout = layouts[currentLayout];
	// 		return (<Layout>
	// 			<Component {...props.globals} {...params} />
	// 		</Layout>);
	// 	}
	// }
	// const Component = routers[404];
	// const Layout = layouts[config.layoutError];
	// return <Layout><Component {...props.globals} /></Layout>;

	/*
	const Test = () => {};
const Test1 = () => {};

const a = {
	client: {
		'add': Test1,
		'list': Test1,
		':id/view': [Test1],
		':id/edit/:action': [Test1, /0-9+/, /(section|photo)/],
	},
	user: {
		'add': Test,
		'list': Test,
		':id': {
			'$root': [/0-9/],
			'view': Test,
			'edit/:action': [Test, /(section|photo)/]
		}

	}
}



console.log(normalizeRouter(a));
	 */
}
