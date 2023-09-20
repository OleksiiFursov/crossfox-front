import {
	FormControlLabel, InputLabel, MenuItem, Select,
	Slider,
	Switch,
	TextField,
	Typography,
} from '@mui/material'
import React, { useState } from 'react'
import AnimatedCounter from '../../package/animated-number/src/index.tsx'
import H2 from 'components/H2'
import Highlight from 'react-highlight'
import 'highlight.js/styles/googlecode.css'
import Grid from '@mui/material/Grid'

const def = {
	value: 1000,
	duration: 1000,
	rate: 60,
	round: 0,
	tagName: 'div',
	showArrow: false,
	suffix: '',
	prefix: '',
	reserve: 0,
	align: 'left',
	reserveMinusSpace: true,
}

function AnimatedNumberPage () {
	const [args, setArgs] = useState({ ...def })
	const set = (key, value) => () => setArgs(prev => ({ ...prev, [key]: value }))
	const isShowCode = key => args[key] !== def[key] ? `\n\t ${key}={${args[key]}}` : ``
	const setCall = (key, value) => set(key, value)()
	const setEvent = (key, type) => e => setCall(key, type ? type(e.target.value) : e.target.value)

	console.log(args)

	return <div className="page-example">
		<div className="controls">
			<H2>Props</H2>

			<Grid container spacing={2}>
				<Grid item xs={6}>
					<TextField variant="standard"
					           helperText="Change the number to start the animation" label="Value"
					           value={args.value}
					           onChange={setEvent('value', Number)}/>
				</Grid>
				<Grid item xs={6}>
					<TextField variant="standard" type="number" maxLength={1} label="Round"
					           value={args.round}
					           onChange={setEvent('round', Number)}/>
				</Grid>
				<Grid item xs={6}>
					<Typography gutterBottom>
						Duration
					</Typography>
					<Slider value={args.duration} min={0} max={10000}
					        onChange={setEvent('duration')}
					        valueLabelDisplay="auto"/>
				</Grid>
				<Grid item xs={6}>
					<Typography gutterBottom>
						Margin end
					</Typography>
					<Slider value={args.reserve} min={0} max={10}
					        onChange={setEvent('reserve')}
					        valueLabelDisplay="auto"/>
				</Grid>
				<Grid item xs={6}>
					<Typography gutterBottom>
						Rate
					</Typography>
					<Slider value={args.rate} min={1} max={120}
					        onChange={setEvent('rate')}
					        valueLabelDisplay="auto"/>
				</Grid>
				<Grid item xs={6}>
					<InputLabel>Align</InputLabel>
					<Select variant="standard" value={args.align} onChange={setEvent('align')}>

						<MenuItem value="left">Left</MenuItem>
						<MenuItem value="right">Right</MenuItem>
					</Select>
				</Grid>
				<Grid item xs={6}>
					<TextField variant="standard" label="Prefix" value={args.prefix}
					           onChange={setEvent('prefix')}/>
				</Grid>
				<Grid item xs={6}>
					<TextField variant="standard" label="Suffix" value={args.suffix}
					           onChange={setEvent('suffix')}/>
				</Grid>

				<Grid item xs={6}>
					<FormControlLabel
						control={<Switch onChange={(e) => setCall('showArrow', e.target.checked)}
						                 checked={args.showArrow}/>} label="Show arrow"/>
				</Grid>

				<Grid item xs={6}>
					<FormControlLabel
						control={<Switch
							onChange={(e) => setCall('reserveMinusSpace', e.target.checked)}
							checked={args.reserveMinusSpace}/>} label="Reserve minus space"/>
				</Grid>

			</Grid>


		</div>
		<div className="result">
			<H2>Result</H2>
			<Grid container className="result-item" spacing={2}>
				<Grid item xs={3}>
					<AnimatedCounter {...args} />
				</Grid>
				<Grid item xs={3}>
					<AnimatedCounter {...args} />
				</Grid>
				<Grid item xs={3}>
					<AnimatedCounter {...args} />
				</Grid>
				<Grid item xs={3}>
					<AnimatedCounter {...args} />
				</Grid>

			</Grid>

			<br/><br/>
			<H2>JSX:</H2>
			<Highlight language="javascript" className="javascript">
				{`import React from 'react';\nimport AnimatedNumber from '@crossfox/react-animated-number';\n
export default function PageExample(){
  return <AnimatedNumber
	 value={${args.value}}${isShowCode('round')}${isShowCode('duration')}${isShowCode('rate')}${isShowCode('prefix')}${isShowCode('suffix')}
  />
}
				`}
			</Highlight>
		</div>

	</div>
}

export default AnimatedNumberPage
