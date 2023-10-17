# @crossfox/react-router

[![npm version](https://badge.fury.io/js/@crossfox%2Freact-router.svg)](https://www.npmjs.com/package/@crossfox/react-router)
[![Build Status](https://travis-ci.com/yourUsername/react-router-extended.svg?branch=master)](https://travis-ci.com/yourUsername/react-router-extended)
![license](https://badgen.now.sh/badge/license/MIT)

## Overview

@crossfox/react-router is a powerful and customizable routing library for React applications. It provides an intuitive way to manage your application's routes and their corresponding components. With @crossfox/react-router, you can create complex navigation systems and handle various routing scenarios with ease.

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

const UserWithIdPage = ({id}) => <h1>User {id}</h1>;

const UserWithNamePage = ({name}) => <h1>User {name}</h1>;
const BlogListWithChildrenPage = () => <h1>Blog list</h1>;

const BlogViewWithChildrenPage = ({id}) => <h1>Blog post {id}</h1>;
const BlogAddWithChildrenPage = () => <h1>Blog add</h1>;

const BlogEditWithChildrenPage = ({id,action}) => <h1>Blog post {id}. Action: {action}</h1>;
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
			'edit/:action':  [BlogEditWithChildrenPage, /main|user|content/]
		}
	},
	'.+': Custom404Page // For change Page 404
});

const App = () => <Router />

export default App
```

## API

### `Link`

The `Link` component creates links for navigation between routes.

### `useHistory`

The `useHistory` hook allows access to the navigation history within your components.

### `useNavigate`

The `useNavigate` hook provides a simple way to navigate between routes programmatically.


