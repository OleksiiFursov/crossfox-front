import React, { useEffect, useRef } from 'react'
window.log = console.log
window.FuncEmpty = d => d

function Layout ({ children }) {
	const refTop = useRef()

	useEffect(() => {
		const observer = new IntersectionObserver((els) => {
			const type = els[0].intersectionRatio ? 'remove' : 'add'
			document.body.classList[type]('scrolled')
		})
		observer.observe(refTop.current)
		return () => {
			observer.unobserve(refTop.current)
		}
	}, [])

	return (<>
		<div ref={refTop}/>
		<main>
			{children}
		</main>
	</>)
}

export default Layout
