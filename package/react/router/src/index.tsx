import React, {FC, useRef, useState} from "react";
import {iRouterConfig, iRouterLayout} from "./types";
import {isSimpleObject, isArray, isFunction, clone} from "@crossfox/utils";

const regSlug = /:([a-zA-Z0-9-]+)/g;
const regDef = /.+/;

const normalizeItem = (key: string, item: any[], root: any[]): void => {
	const isConfig = isSimpleObject(item.at(-1));
	const countSlug = key.match(regSlug)?.length || 0;
	const itemLen = item.length + (isFunction(item[0]) ? -1 : 0);

	if (countSlug > itemLen + root.length + (isConfig ? -1 : 0)) {
		item.push(regDef);
	}
	if (isConfig) {
		item.push({})
	}
}

function normalizeRouter(obj: Record<string, any>, prefix = '', root = []) {
	let res: Record<string, any> = {};
	for (const key in obj) {
		if (key === '$root') continue;
		let item: any = obj[key];

		if (isSimpleObject(item)) {
			const rootChildren = item.$root || [];
			normalizeItem(key, rootChildren, root);
			Object.assign(res, normalizeRouter(item, prefix + key + '/', rootChildren));
		} else {
			if (!isArray(item)) {
				item = [item];
			}
			normalizeItem(key, item, root);
			item.splice(1, 0, ...root)
			res[prefix + key] = item;
		}
	}
	return res;
}


export const LayoutError: FC<iRouterLayout> = ({children}) => <div className="page-error">{children}</div>;
export const LayoutDefault: FC<iRouterLayout> = ({children}) => children
export const NotFoundPage = () => <h1>Page not found</h1>

export function createRouter(routers: any) {
	const [url, setUrl] = useState(null);
	const stateLayout= useRef<string>('default');
	const stateHistory= useRef<string[]>([]);

	const _routers = normalizeRouter(routers);
	routers = [[404, NotFoundPage]];

	for (let key in _routers) {
		const item = _routers[key];
		const slugNames: string[] = [];

		key = key.replace(regSlug, (_: string, slug: string) => {
			slugNames.push(slug);
			let regExp = item.splice(1, 1)[0];
			if (regExp instanceof RegExp) {
				regExp = (regExp + '').slice(1, -1)
			}
			return '(' + regExp + ')';
		});
		item.splice(1, 0, ...slugNames);
		routers.push([RegExp(key), ...item]);
	}

	function Router(props: iRouterConfig) {
		let {url, layout = 'blank', layouts = {}} = props;

		layouts = {
			error: LayoutError,
			default: LayoutDefault,
			...layouts
		};

		url = url || location.pathname;

		for (const router of routers) {
			const configRouter = router.pop();
			const [path] = router;

			if (~url.search(path)) {
				const match = url.match(path) || [];
				const router = clone(routers[path]);
				const Component = router[0];

				const params: Record<string, string> = {};
				for (let i = 1; i < match.length; i++) {
					params[router[i]] = match[i]!;
				}

				const currentLayout = configRouter.layout || layout;
				if (currentLayout !== layout) {
					stateLayout.current = currentLayout;
				}
				const Layout = layouts[currentLayout];
				return (<Layout>
					<Component {...params} />
				</Layout>);
			}
		}
		const Component = routers[404];
		const Layout = layouts.error;
		return <Layout><Component/></Layout>;
	}

	return {Router};
}
