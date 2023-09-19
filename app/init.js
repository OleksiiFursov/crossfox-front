import * as React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './layout.js'
import { createRoot } from 'react-dom/client'
import router from './router.js'
import './main.scss';

createRoot(document.getElementById("app"))
.render(
		<Layout>
			<RouterProvider router={createBrowserRouter(router)} />
		</Layout>
);
