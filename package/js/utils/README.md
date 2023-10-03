# Utils by CrossFox

[![npm version](https://badge.fury.io/js/@crossfox%2Futils.svg)](https://www.npmjs.com/package/@crossfox/utils)
[![Blazing Fast](https://badgen.now.sh/badge/speed/blazing%20%F0%9F%94%A5/green)](https://unpkg.com/@crossfox/utils)
[![gzip size](http://img.badgesize.io/https://unpkg.com/@crossfox/utils/dist/index.js?compression=gzip)](https://unpkg.com/@crossfox/utils/dist/index.js)
[![NPM downloads][download-image]][download-url]
![license](https://badgen.now.sh/badge/license/Apache-2.0)

[download-image]: https://img.shields.io/npm/dm/@crossfox/utils.svg?style=flat-square

[download-url]: https://npmjs.org/package/@crossfox/utils


The `@crossfox/utils` package is a collection of useful utilities and functions designed to streamline and enhance the development process of web applications and other software projects. This package provides developers with a set of tools for more efficient work, reducing code duplication, and improving overall productivity.

* 🌟 Easy to use
* ⚡ High performance
* 🔗 No dependency


### Install

```bash
npm install @crossfox/utils
```

```bash
yarn add @crossfox/utils
```
## Functions and Utilities

### Object

- `isEmpty(value: any): boolean`

	The `isEmpty` function checks if a value is empty (null, undefined, empty string, or empty array).

	- `value`: The value to check.

	**Returns:** `true` if the value is empty, `false` otherwise.

- `crop(obj: Record<string, any>, keys: string[], isDelete = false): Record<string, any>`

	The `crop` function creates a new object containing the specified keys from the source object, with an option to delete the keys from the source object.

	- `obj`: The source object.
	- `keys`: An array of keys to extract.
	- `isDelete` (default `false`): An option to delete the keys from the source object.

	**Returns** a new object with the selected keys.

- `setObject(obj: Record<string, any>): (...args: any[]) => Record<string, any>`

	The `setObject` function dynamically sets keys and values in an object using a variadic function.

	- `obj`: The source object.

	Returns a function that accepts key-value pairs to add to the object and returns the updated object.

- `takeItem(arr: Record<string, any>, column: string, def = null): any`

	The `takeItem` function is used to retrieve a value from an object and optionally remove it.

	- `arr`: The source object.
	- `column`: The key to retrieve the value.
	- `def` (default `null`): The default value to return if the key is missing.

	Returns the extracted value or the default value if the key is missing.

### Types

- `isString(value: any): boolean`

	The `isString` function checks if a value is a string.

	- `value`: The value to check.

	Returns `true` if the value is a string, `false` otherwise.

- `isNull(value: any): boolean`

	The `isNull` function checks if a value is null.

	- `value`: The value to check.

	Returns `true` if the value is null, `false` otherwise.

- `isBoolean(value: any): boolean`

	The `isBoolean` function checks if a value is a boolean (true or false).

	- `value`: The value to check.

	Returns `true` if the value is a boolean, `false` otherwise.

- `checkType(prefix: string, name: string, value: any, type: (() =>


### Author

- Oleksii Fursov [@nodePro777](https://t.me/nodePro777)


## Example

```js
import {
	takeItem,
	crop,
	setObject,
	isEmpty,
	isString,
	isNull,
	isBoolean,
	checkType,
	range,
	parseJSON,
	maskValue,
} from '@crossfox/utils';

// Example of using the takeItem function
const data = { name: 'John', age: 30 };
const name = takeItem(data, 'name');

// Example of using the crop function
const sourceObj = { name: 'Alice', age: 25, country: 'USA' };
const keysToCrop = ['name', 'age'];
const croppedObj = crop(sourceObj, keysToCrop, true);

// Example of using the setObject function
const obj = { firstName: 'Jane' };
const updatedObj = setObject(obj)('lastName', 'Doe', age, 21);

// Example of using the isEmpty function
const emptyValue = null;
const isValueEmpty = isEmpty(emptyValue);

// Example of using the isString function
const stringValue = 'Hello';
const isStringValue = isString(stringValue);

// Example of using the isNull function
const nullValue = null;
const isNullValue = isNull(nullValue);

// Example of using the isBoolean function
const booleanValue = true;
const isBooleanValue = isBoolean(booleanValue);

// Example of using the checkType function
checkType('validate', 'stringValue', stringValue, 'string');
// Uncomment the following line to see a TypeError exception, as the type 'string' does not match the nullValue variable
// checkType('validate', 'nullValue', nullValue, 'string');

// Example of using the range function
const numbersInRange = range(1, 5); // [1, 2, 3, 4, 5]

// Example of using the parseJSON function
const jsonString = '{"name": "Alice", "age": 25}';
const parsedObject = parseJSON(jsonString); 

// Example of using the maskValue function
const maskedString = maskValue('12345678', 'XXX-XXX-XXX'); // 123-456-789
```
