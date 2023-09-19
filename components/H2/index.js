import React from 'react';
import { Divider, Typography } from '@mui/material'

function H2(props){
	const {children, ...rest} = props
	return <div className="h2-wrap">
		<Typography component="h2" variant="h5" gutterBottom {...rest}>{children}</Typography>
		<Divider />
	</div>
}

export default H2;
