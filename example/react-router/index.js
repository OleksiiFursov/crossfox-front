import Countdown from 'package/react/Countdown/src/index.tsx'
import React from 'react';
import { createRouter } from 'package/react/router/src/index.tsx'

const Test = () => <div>123</div>
const a = {
	client: {
		'add': Test,
		'list': Test,
		':id/view': [Test],
		':id/edit/:action': [Test, /0-9+/, /(section|photo)/],
	},
	user: {
		'add': Test,
		'list': Test,
		':id': {
			// '$root': [/0-9/],
			'view': Test,
			'edit/:action': [Test, /(section|photo)/]
		}

	}
}

const b = {
	client: {
		'add': Test,
		'list': Test,
		'([0-9]+)/view': [Test, 'id'],
		'([0-9]+)/edit/(section|photo)': [Test, 'id', 'action'],
	},
	user: {
		'add': Test,
		'list': Test,
		'([0-9]+)': {
			'root': ['id'],
			'view': Test,
			'edit/(section|photo)': [Test, 'action']
		}

	}
}
const c =  {
	'/client': Test,
	'/client/list': Test,
	'/client/add': Test,
	'/client/([0-9]+)/edit/(section|photo)': [Test, 'id', 'action'],
	'/client/([0-9]+)/view/': [Test, 'id'],
	'/user': Test,
	'/user/list': Test,
	'/user/add': Test,
	'/user/([0-9]+)/edit/(section|photo)': [Test, 'id', 'action'],
	'/user/([0-9]+)/view/': [Test, 'id'],
}

const d =  {
	'/client': Test,
	'/client/list': Test,
	'/client/add': Test,
	'/client/:id/edit/:action': [Test, /0-9+/, /section|photo/],
	'/client/:id/view/': [Test, /0-9+/],
	'/user': Test,
	'/user/list': Test,
	'/user/add': Test,
	'/user/:id/edit/:action': [Test, /0-9+/, /section|photo/],
	'/user/:id/view/': [Test, /0-9+/],
}

function ReactRouterPage(){
	console.log(createRouter(a));
	return 1 //<Countdown value={1000} format="hh:mm:ss" />
}

export default ReactRouterPage
