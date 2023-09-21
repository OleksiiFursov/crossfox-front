import Root from './root.js'
import AnimatedNumber from '../example/animated-number/index.js'
import Preact from '../example/preact'
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
				path: "preact",
				element: <Preact />,
			}
		]
	}
]

export default router;
