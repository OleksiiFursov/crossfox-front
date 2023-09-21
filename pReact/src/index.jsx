import { render } from 'preact';
import { LocationProvider, Router, Route } from 'preact-iso';

import { Header } from './components/Header.jsx';
import { Home } from './pages/Home/index.jsx';
import { NotFound } from './pages/_404.jsx';
import AnimatedNumber from '../../package/preact/animated-number/src'
export function App() {

	console.log(AnimatedNumber);
	return <div>
		<AnimatedNumber value={1100}/>
		11
	</div>	;
	// return (
	// 	<LocationProvider>
	// 		<Header />
	// 		<main>
	//
	// 			<Router>
	// 				<Route path="/" component={Home} />
	// 				<Route default component={NotFound} />
	// 			</Router>
	// 		</main>
	// 	</LocationProvider>
	// );
}

render(<App />, document.getElementById('app'));
