import {createContext, createElement} from 'preact';
import {useContext, useRef, useState} from "preact/hooks";
import {isSimpleObject, isArray, isFunction} from "@crossfox/utils";

const regSlug = /:([a-zA-Z0-9-]+)/g;
const regDef = /[^/]+/;
const eFunc = d => d;

const normalizeItem = (key, item, root, createConfig = true) => {
	const isConfig = isSimpleObject(item.at(-1));
	const countSlug = key.match(regSlug)?.length || 0;
	const itemLen = item.length + (isFunction(item[0]) ? -1 : 0);

	if (countSlug > itemLen + root.length + (isConfig ? -1 : 0)) {
		item.push(regDef);
	}
	if (createConfig && !isConfig) {
		item.push({})
	}
}

const toStr = v => v instanceof RegExp ? (v + '').slice(1, -1) : v;

let cExt = {
	baseUrl: '/',
	setSUrl: eFunc,
	onChange: eFunc,
	sHistory: {current: []},
	sUrl: '',
	sLayout: {current: 'default'}
};

function normalize(obj, prefix = '', root = []) {
	let res = {};
	for (const key in obj) {
		if (key === '$root') continue;
		let item = obj[key];

		const prefixAll = prefix + key;
		if (isSimpleObject(item)) {
			const rootChildren = item.$root || [];
			normalizeItem(key, rootChildren, root, false);
			Object.assign(res, normalize(item, prefixAll + '/', rootChildren));
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


const LayoutError = ({children}) => <div className="page-error">{children}</div>;
const LayoutDefault = ({children}) => children
const NotFoundPage = () => <h1>Page not found</h1>

const layoutDef = {
	error: LayoutError,
	default: LayoutDefault,
}

const RouterCtx = createContext(cExt);

export const goTo = (url, data = {}) => _goTo(cExt, url, data);

export const goBack = (level = -1) => {
	const data = cExt.sHistory.current.at(level);

	if (data) {
		cExt.onChange(cExt.sUrl, data[0]);
		goTo(...data);
	}
}

function _goTo(ctx, url, data) {
	ctx.setSUrl(url, data);
	ctx.onChange(ctx.sUrl, url);
	history.pushState(null, '', ctx.baseUrl + url);
	const h = ctx.sHistory.current || [];
	if (h.length > 30) {
		h.shift();
	}
	h.push([url, data]);
}


const useRContext = name => {
	const context = useContext(RouterCtx);
	if (!context) {
		throw new Error(name + ' must be used within a <Router>');
	}
	return context;
};

export const useHistory = () => {
	const context = useRContext('useHistory');
	return context.sHistory.current;
}

export const useRouterData = () => {
	const context = useRContext('useRouterData');
	// @ts-ignore
	return (context.sHistory.current.at(-1) || [])[1] || [];
}
export const useNavigate = () => {
	const context = useRContext('useNavigate');
	return (url, data) => _goTo(context, url, data);
}

export const useLayout = () => {
	const context = useRContext('useLayout');
	return context.sLayout.current;
}

const JSX = (ctx, Layout, Component, params = {}) => (
	<RouterCtx.Provider value={ctx}>
		<Layout>
			<Component {...params} />
		</Layout>
	</RouterCtx.Provider>
);

export const Link = props => {
	const {tagName = 'a', data = {}, to, children, ...rest} = props;
	rest.onClick = (e) => {
		e.preventDefault();
		goTo(to, data);
	};
	if (tagName === 'a') {
		rest.href = to;
	}

	return createElement(tagName, rest, children)
}


function createRouter(routerData) {
	const _routers = normalize(routerData);
	const routers = [];

	for (let key in _routers) {
		const item = _routers[key];
		const slugNames = [];

		key = key.replace(regSlug, (_, slug) => {

			slugNames.push(slug);
			return '(' + toStr(item.splice(1, 1)[0]) + ')';
		});
		item.splice(1, 0, ...slugNames);
		routers.push([RegExp('^' + key + '$'), ...item]);
	}

	function Router(props) {

		let {url, layout = 'default', layouts = {}, baseUrl = '/', onChange = eFunc} = props;

		layouts = {
			...layoutDef,
			...layouts
		};


		const [sUrl, setSUrl] = useState(url || location.pathname.slice(1));
		const sLayout = useRef('default');
		const sHistory = useRef([]);

		const ctx = {
			baseUrl, sUrl, setSUrl, sLayout, sHistory, onChange
		};
		cExt = ctx;


		for (let router of routers) {
			const path = router[0];
			router = [...router];
			if (~sUrl.search(path)) {
				const configRouter = router.pop();
				const match = sUrl.match(path) || [];

				const params = {};

				for (let i = 1; i < match.length; i++) {
					params[router[i + 1]] = match[i];
				}

				const currentLayout = configRouter.layout || layout;

				if (currentLayout !== layout) {
					sLayout.current = currentLayout;
				}

				return JSX(ctx, layouts[currentLayout], router[1], params);
			}
		}
		return JSX(ctx, layouts.error, NotFoundPage);
	}

	return Router;
}

export default createRouter
