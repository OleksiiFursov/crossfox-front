
import React from 'react'
import {  Outlet } from 'react-router-dom'


function Root(){


	return <>
		{/*<Tabs value="component-animated-number">*/}
		{/*	<Tab label="component-animated-number" value="component-animated-number" to="component-animated-number" component={Link} />*/}
		{/*	<Tab label="Drafts" value="/drafts" to="/drafts" component={Link} />*/}
		{/*	<Tab label="Trash" value="/trash" to="/trash" component={Link} />*/}
		{/*</Tabs>*/}
		<Outlet />
	</>
}

export default Root;
