import React, {memo} from 'react'
import { Slider } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';

function InputRange (props) {
	const {label, ...rest} = props;

	return (<>
			<InputLabel className="smallLabel">
				{label}
			</InputLabel>
			<Slider valueLabelDisplay="auto" {...rest} />
		</>
	)
}

export default memo(InputRange)
