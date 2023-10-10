import Root from './root.js'
import AnimatedNumber from '../example/animated-number/index.js'
import CssStart from '../example/css-start/index.js';
import ReactRouter from '../example/react-router/index.js';
import * as React from 'react'

const router = [
	{
		path: "/",
		element: <Root />,
		children: [
			{
				path: "component-animated-number",
				element: <AnimatedNumber />,
			},
			{
				path: "css-start",
				element: <CssStart />,
			},
			{
				path: "component-react-router",
				element: <ReactRouter />,
			},

		]
	}
]

export default router;
