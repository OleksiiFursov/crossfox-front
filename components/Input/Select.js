import { InputLabel, MenuItem, Select } from '@mui/material'
import React, { memo } from 'react'

function InputSelect (props) {

	const { label, options, ...rest } = props
	return (
		<>
			<InputLabel className="smallLabel">{label}</InputLabel>
			<Select variant="standard" {...rest}>
				{Object.entries(options).map(([key, value]) => (
					<MenuItem key={key} value={key}>{value}</MenuItem>
				))}

			</Select>
		</>
	)
}

export default memo(InputSelect)
