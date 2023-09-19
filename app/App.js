import { useState } from 'react'
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {
	createBrowserRouter,
	Link, RouterProvider, useNavigate,
} from 'react-router-dom'




export default function TabsRouter() {
	const [page, setPage] = useState('main');

	return (
		<>
			<Tabs value={page}>
				<Tab label="Main" value="/inbox/:id" to="/inbox/1"/>
			</Tabs>


		</>

	);
}
