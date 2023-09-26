# CSS-start by CrossFox

[![npm version](https://badge.fury.io/js/@crossfox%2Fcss-start.svg)](https://www.npmjs.com/package/@crossfox/css-start)
[![Blazing Fast](https://badgen.now.sh/badge/speed/blazing%20%F0%9F%94%A5/green)](https://unpkg.com/@crossfox/css-start)
[![NPM downloads][download-image]][download-url]
![license](https://badgen.now.sh/badge/license/Apache-2.0)

[download-image]: https://img.shields.io/npm/dm/@crossfox/css-start.svg?style=flat-square

[download-url]: https://npmjs.org/package/@crossfox/css-start

The "Start-css" package is a popular tool in web development that helps standardize default styles across different web
browsers. By including this package, developers can start with a clean slate for their CSS styling, reducing
inconsistencies and ensuring a more predictable layout and design across various browsers.

* 📦 Small size
* 💪 Cross-browser
* 🌟 Removing unnecessary styles 
* 🧮 Normalize css styles


### Includes

1. **Support HTML5 (for ~5% of old browsers):**
     
	This CSS includes styles to support HTML5 elements, ensuring that they are displayed correctly in older browsers that may not inherently recognize these elements.


2. **Fix hr and abbr:**

	 Specific styles are applied to the `<hr>` (horizontal rule) and `<abbr>` (abbreviation) elements to adjust their appearance and behavior.


3. **Remove margin (for body, h1, h2, h3, h4, h5, h6, p, dl, dd, blockquote, ul, ol, figure):**

	 The margin is reset to zero for various HTML elements. This removes any default spacing that browsers might apply to these elements.


4. **Add styles for tags (box-sizing, background-repeat, vertical-align):**

	 These CSS properties are applied to all HTML elements, improving their rendering and layout. `box-sizing: border-box;` is especially useful for consistent box sizing.


5. **Remove styles for focus and active states:**

	 Any default styles for focus and active states (such as outlines) are removed, ensuring a cleaner appearance for these states.


6. **Fix 'hidden' attribute and the 'template' tag:**

	 Styles are added to properly handle the 'hidden' attribute and the 'template' tag, ensuring that elements with these attributes are hidden as intended.


7. **Reset default styles for tags (a, h1, h2, h3, h4, h5, h6, p, cite, address, blockquote, ul, ol):**

	 Default styles for these elements are reset, allowing developers to apply custom styles without interference from browser defaults.


8. **Add (overflow-wrap: break-word;) for h1, h2, h3, h4, h5, h6, p:**

	 This CSS rule ensures that long words within heading and paragraph elements are broken into multiple lines, preventing them from overflowing their containers.


9. **Change rem to 10px:**

	 The base font size is set to 10px. This can simplify font size calculations, as 1rem will now equal 10px.


10. **Add rules for smoother rendering:**

    Various CSS properties are set to improve text rendering, including antialiasing and text-decoration handling.


11. **Add (min-height: 100%) for body + fix for iOS:**

     The min-height of the <body> element is set to 100%, ensuring that the page occupies the full height of the viewport. The -webkit-fill-available property is also added for iOS compatibility, ensuring correct functionality.


12. **Normalize tables. Add (border-collapse: collapse; border-spacing: 0;):**

    This normalizes the rendering of HTML tables by setting `border-collapse` to 'collapse' and `border-spacing` to '0', removing any spacing between table cells.


13. **Add a mode without animations:**

    This CSS code provides a mode without animations, which can be useful for users who prefer reduced motion or for specific design considerations where animations are not desired.


14. **Other**
	
    In addition, there are some minor rules for the correct or improved display of the page
			

### Author

- Oleksii Fursov [@nodePro777](https://t.me/nodePro777)
