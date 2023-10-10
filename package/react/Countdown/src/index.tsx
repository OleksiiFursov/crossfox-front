import React, {memo} from 'react';
import {iCountdown} from "./types";

import './index.css';

const reserved = 'lmsh';
const limit = {
	h: [2,9],
	m: [6,9],
	s: [6,9],
	l: [9,9]
}
//https://codepen.io/kindofone/pen/DddNdL
function Countdown(props:iCountdown) {
	let {value, className, format='hh:mm:ss', vocabulary='0123456789'} = props;
	return <div className="ccd">
		{[...format].map((v, index) => {
			if(reserved.includes(v)){
				return <div>{v}</div>
			}else{
				return [...vocabulary].map((vv, index) => (
					<div key={index}>{vv}</div>
				))
			}



		})}
		<div className="countdown"></div>

	</div>
}

export default memo(Countdown);
