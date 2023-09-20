import InputRange from 'components/Input/type/range.js'
import InputSwitch from 'components/Input/type/switch.js'
import InputText from 'components/Input/type/text.js'
import React, { memo } from 'react'

function Input (props) {
	const { type, ...rest } = props
	let component

	switch (type) {
		case 'range':
			component = <InputRange {...rest} />
			break
		case 'switch':
			component = <InputSwitch  {...rest} />
			break
		default:
			component = <InputText type={type} {...rest} />
			break
	}
	return component

}

export default memo(Input)
