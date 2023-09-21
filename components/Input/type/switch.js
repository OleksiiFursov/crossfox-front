import { FormControlLabel, Switch } from '@mui/material'
import React, { memo } from 'react'

function InputSwitch (props) {
	const { value, checked, label,  ...rest } = props

	return (
		<FormControlLabel
			label={label}
			control={<Switch
				fullWidth
				checked={value || checked}
				{...rest}
			/>}
		/>
	)

}

export default memo(InputSwitch)
