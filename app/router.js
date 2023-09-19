import Root from './root.js'
import AnimatedNumber from '../example/animated-number/index.js'
import * as React from 'react'

const router = [
	{
		path: "/",
		element: <Root />,
		children: [
			{
				path: "component/animated-number",
				element: <AnimatedNumber />,
			}
		]
	}
]

export default router;
