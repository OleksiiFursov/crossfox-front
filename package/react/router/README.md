# @crossfox/react-router

[![npm version](https://badge.fury.io/js/@crossfox%2Freact-router.svg)](https://www.npmjs.com/package/@crossfox/react-router)
[![Blazing Fast](https://badgen.now.sh/badge/speed/blazing%20%F0%9F%94%A5/green)](https://www.npmjs.com/package/@crossfox/react-router)
[![gzip size](http://img.badgesize.io/https://unpkg.com/@crossfox/react-router/dist/index.js?compression=gzip)](https://unpkg.com/@crossfox/react-router/dist/index.js)
[![NPM downloads][download-image]][download-url]
![license](https://badgen.now.sh/badge/license/Apache-2.0)

[download-image]: https://img.shields.io/npm/dm/@crossfox/react-router.svg?style=flat-square
[download-url]: https://npmjs.org/package/@crossfox/react-router


## Overview

@crossfox/react-router is a powerful and customizable routing library for React applications. It provides an intuitive
way to manage your application's routes and their corresponding components. With @crossfox/react-router, you can create
complex navigation systems and handle various routing scenarios with ease.

## Features

- Simple and intuitive API
- Flexible configuration options
- Full control over routing and navigation
- Customizable route matching and handling

## Installation

```bash
npm install @crossfox/react-router
```

or

```bash
yarn add @crossfox/react-router
```

## Usage

```jsx
import React from 'react';
import createRouter from '@crossfox/react-router';

const MainPage = () => <h1>Main Page</h1>;
const AboutPage = () => <h1>About Page</h1>;

const UserWithIdPage = ({ id }) => <h1>User {id}</h1>;

const UserWithNamePage = ({ name }) => <h1>User {name}</h1>;
const BlogListWithChildrenPage = () => <h1>Blog list</h1>;

const BlogViewWithChildrenPage = ({ id }) => <h1>Blog post {id}</h1>;
const BlogAddWithChildrenPage = () => <h1>Blog add</h1>;

const BlogEditWithChildrenPage = ({ id, action }) => <h1>Blog post {id}. Action: {action}</h1>;
const Custom404Page = () => <h1>Custom 404</h1>;

const Router = createRouter({
	'': MainPage, // or [MainPage]
	'about': [AboutPage],
	'user/:id': [UserWithIdPage, /[0-9]+/],
	'user/:name': [UserWithNamePage, /[a-zA-Z0-9_]+/],
	'blog': {
		list: BlogListWithChildrenPage,
		add: BlogAddWithChildrenPage,
		':id': {
			'$root': [/[0-9]+/], // for ":id"
			'view': BlogViewWithChildrenPage,
			'edit/:action': [BlogEditWithChildrenPage, /main|user|content/]
		}
	},
	'.+': Custom404Page // For change Page 404
});

const App = () => <Router/>

export default App
```

### Author

- Oleksii Fursov [@nodePro777](https://t.me/nodePro777)


## API

### `<Link to="url">Link</Link>`

The `Link` component creates links for navigation between routes.

| Property | Type                               | Description                                                   |
|----------|------------------------------------|---------------------------------------------------------------|
| to       | string                             | Specifies the target location of the link                     |
| tagName  | string (optional)                  | Defines the HTML tag to be used for the link (default is `a`) |
| data     | Record<string, string> (optional)  | Additional data associated with the link                      |
| onClick  | (e: MouseEvent) => void (optional) | Event handler for the click event on the link                 |
| href     | string (optional)                  | Specifies the hyperlink destination URL for the link          |

### `goTo(url: string, data?:object)` :void

The `goTo` function allows you to navigate to a specific route programmatically.

### `goBack(level=-1)` :void

The `goBack` function allows you to navigate back to the previous route in the navigation history.

### `useHistory()` :array

The `useHistory` hook allows access to the navigation history within your components. Return array

### `useNavigate()` :function

The `useNavigate` hook provides a simple way to navigate between routes programmatically. Return method for change router

### `useLayout()` :string

The `useLayout` hook allows you to access the current layout information within your components.

### `useRouterData()` :array

The `useRouterData` hook provides access to the data associated with the current route.
