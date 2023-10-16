import React, {createContext, createElement, FC, useContext, useRef, useState} from "react";
import {iRouterConfig, iRouterContext, iRouterLink} from "./types";
import {isSimpleObject, isArray, isFunction} from "@crossfox/utils";

const regSlug = /:([a-zA-Z0-9-]+)/g;
const regDef = /.+/;

const normalizeItem = (key: string, item: any[], root: any[]) => {
	const isConfig = isSimpleObject(item.at(-1));
	const countSlug = key.match(regSlug)?.length || 0;
	const itemLen = item.length + (isFunction(item[0]) ? -1 : 0);

	if (countSlug > itemLen + root.length + (isConfig ? -1 : 0)) {
		item.push(regDef);
	}
	if (!isConfig) {
		item.push({})
	}
}
const toStr = (v: RegExp | string) => v instanceof RegExp ? (v + '').slice(1, -1) : v;

let contextExt: iRouterContext = {
	baseUrl: '/',
	setSUrl: () => {},
	sHistory: {current: []},
	sUrl: '',
	sLayout: {current: 'default'}
};

function normalizeRouter(obj: Record<string, any>, prefix = '', root = []) {
	let res: Record<string, any> = {};
	for (const key in obj) {
		if (key === '$root') continue;
		let item: any = obj[key];

		const prefixAll = prefix + key;
		if (isSimpleObject(item)) {
			const rootChildren = item.$root || [];
			normalizeItem(key, rootChildren, root);
			Object.assign(res, normalizeRouter(item, prefixAll + '/', rootChildren));
		} else {
			if (!isArray(item)) {
				item = [item];
			}
			normalizeItem(key, item, root);
			item.splice(1, 0, ...root)
			res[prefixAll] = item;
		}
	}
	return res;
}


export const LayoutError: FC = ({children}) => <div className="page-error">{children}</div>;
export const LayoutDefault: FC = ({children}) => <>{children}</>
export const NotFoundPage = () => <h1>Page not found</h1>


const RouterContext = createContext(contextExt);

export const goTo = (url: string, data: Record<string, any> = {}) => _goTo(contextExt, url, data);

export const goBack = (level: number = -1) => {
	// @ts-ignore
	const data = contextExt.sHistory.current.at(level);

	if (data) {
		goTo(...data);
	}
}

function _goTo(context: iRouterContext, url: string, data: Record<string, any>) {
	context.setSUrl(url, data);
	history.pushState(null, '', context.baseUrl+url);
	// @ts-ignore
	context.sHistory.current.push([url, data]);
}


const useRouterContext = (name: string): iRouterContext => {
	const context = useContext(RouterContext) as iRouterContext;
	if (!context) {
		throw new Error(name + ' must be used within a <Router>');
	}
	return context;
};

export const useHistory = () => {
	const context = useRouterContext('useHistory');
	return context.sHistory.current;
}

export const useRouterData = () => {
	const context = useRouterContext('useRouterData');
	// @ts-ignore
	return (context.sHistory.current.at(-1) || [])[1] || [];
}
export const useNavigate = () => {
	const context = useRouterContext('useNavigate');
	return (url: string, data: Record<string, any>) => _goTo(context, url, data);
}

export const useLayout = () => {
	const context = useRouterContext('useLayout');
	return context.sLayout.current;
}

export const Link = (props: iRouterLink) => {
	const {tagName = 'a', data = {}, to, children, ...rest} = props;
	rest.onClick = (e: MouseEvent) => {
		e.preventDefault();
		goTo(to, data);
	};
	if (tagName === 'a') {
		rest.href = to;
	}

	return createElement(tagName, rest, children)
}


function createRouter(routers: any) {
	const _routers = normalizeRouter(routers);
	routers = [];

	for (let key in _routers) {
		const item = _routers[key];
		const slugNames: string[] = [];

		key = key.replace(regSlug, (_: string, slug: string) => {
			slugNames.push(slug);
			return '(' + toStr(item.splice(1, 1)[0]) + ')';
		});
		item.splice(1, 0, ...slugNames);
		routers.push([RegExp(key), ...item]);
	}

	function Router(props: iRouterConfig) {

		let {url, layout = 'default', layouts = {}, baseUrl='/'} = props;

		layouts = {
			error: LayoutError,
			default: LayoutDefault,
			...layouts
		};


		const [sUrl, setSUrl] = useState(url || location.pathname);
		const sLayout = useRef<string>('default');
		const sHistory = useRef<[string, Record<string, any>][] | null>([]);
		const contextValues: iRouterContext = {
			baseUrl, sUrl, setSUrl, sLayout, sHistory
		};
		contextExt = contextValues;

		const returnJSX = (Layout: FC, Component: FC, params: any = {}) => (
			<RouterContext.Provider value={contextValues}>
				<Layout>
					<Component {...params} />
				</Layout>
			</RouterContext.Provider>
		);

		for (let router of routers) {
			const path = router[0];
			router = Object.assign([], router);

			if (~sUrl.search(path)) {
				const configRouter = router.pop();
				const match = sUrl.match(path) || [];

				const params: Record<string, string> = {};

				for (let i = 1; i < match.length; i++) {
					params[router[i + 1]] = match[i]!;
				}

				const currentLayout = configRouter.layout || layout;

				if (currentLayout !== layout) {
					sLayout.current = currentLayout;
				}

				return returnJSX(layouts[currentLayout], router[1], params);
			}
		}
		return returnJSX(layouts.error, NotFoundPage);
	}

	return Router;
}

export default createRouter
