# React animated number by CrossFox

[![npm version](https://badge.fury.io/js/crossfox-react-animated-number.svg)](https://www.npmjs.com/package/@crossfox/react-animated-number)
[![Blazing Fast](https://badgen.now.sh/badge/speed/blazing%20%F0%9F%94%A5/green)](@crossfox/react-animated-number)
[![gzip size](http://img.badgesize.io/https://unpkg.com/@crossfox/react-animated-number/dist/index.js?compression=gzip)](https://unpkg.com/formik@latest/dist/formik.esm.js)
[![NPM downloads][download-image]][download-url]
![license](https://badgen.now.sh/badge/license/Apache-2.0)

[download-image]: https://img.shields.io/npm/dm/@crossfox/react-animated-number.svg?style=flat-square

[download-url]: https://npmjs.org/package/@crossfox/react-animated-number


A lightweight, blazing-fast React component that's easy to use and works with React 16.8 and higher.

* 📦 <1kb mini library
* 🌟 Easy to use
* ⚡ High performance

### Demo:

[View demo here](https://oleksiifursov.github.io/crossfox-front/build/#/component-animated-number)

### Install

```bash
npm install @crossfox/react-animated-number
```

```bash
yarn add @crossfox/react-animated-number
```

### Author

- Oleksii Fursov [@nodePro777](https://t.me/nodePro777)

### Props

| Name                | Type       | Default Value                                      | Description                                                                                                   | Version |
|---------------------|------------|----------------------------------------------------|---------------------------------------------------------------------------------------------------------------|---------|
| `value`             | `number`   | `0`                                                | Current value, triggers animation on change                                                                   | 1.00    |
| `round`             | `number`   | `0`                                                | Number of decimal places                                                                                      | 1.00    |
| `duration`          | `number`   | `1000`                                             | Animation duration(ms)                                                                                        | 1.00    |	
| `className`         | `string`   | `0`                                                | You can add custom classes                                                                                    | 1.00    |	
| `showArrow`         | `boolean`  | `false`                                            | Display an arrow to the left of the number indicating growth or decline                                       | 1.00    |	
| `reserveMinusSpace` | `boolean`  | `false`                                            | Adds a space for the minus sign                                                                               | 1.00    |	
| `reserve`           | `number`   | `0`                                                | Reserves space for the number                                                                                 | 1.00    |	
| `align`             | `string`   | `"left"`                                           | Reservation direction. Available only as 'left', in other cases 'right'                                       | 1.00    |	
| `prefix`            | `string`   | `""`                                               | Adds text to be placed before the number. For example, '$100'                                                 | 1.00    |	
| `suffix`            | `string`   | `""`                                               | Adds text to be placed after the number. For example, '1000 UAH'                                              | 1.00    |	
| `rate`              | `string`   | `60`                                               | Number of updates per second                                                                                  | 1.00    |
| `tagName`           | `string`   | `div`                                              | Tag to be created for the number.                                                                             | 1.00    |
| `onFinish`          | `function` | function(<br/>oldValue, <br/>value, <br/>$el<br/>) | Event triggers after the animation is complete. Returns the old number, current number, and the element node. | 1.00    |

### ClassName status

| ClassName      | Description                            |
|----------------|----------------------------------------|
| `is-progress`  | Added during the animation             |
| `is-increment` | Notifies that the number has increased |
| `is-decrement` | Notifies that the number has decreased | 

####

## Example

```jsx
import React, { useState } from 'react';
import AnimatedNumber from '@crossfox/react-animated-number';

const App = () => {
	const [value, setValue] = useState(0)
	const onClickRandom = () => setValue(Math.random() * 10000 >> 0)
	return (<>
		<button onClick={onClickRandom}>Random value</button>
		<AnimatedNumber value={value}/>
	</>)
}
```
