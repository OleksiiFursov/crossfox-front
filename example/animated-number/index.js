import { Button } from '@mui/material'
import Input from 'components/Input/index.js'
import Select from 'components/Input/Select.js'
import React, { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard/src'
import AnimatedCounter from '../../package/react/animated-number/src/index.tsx'
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
	const isShowCode = key => args[key] !== def[key] ? `\n\t ${key}={${args[key]}}` : ''
	const setCall = (key, value) => set(key, value)()
	const setEvent = (key, type) => e => setCall(key, type ? type(e.target.value) : e.target.value)

	let codeExample = ''

	for (const key in def) {
		let str = isShowCode(key)
		if (str && typeof def[key] === 'string') {
			str = '\'' + str + '\''
		}
		codeExample += str
	}
	if (codeExample) {
		codeExample += '\n'
	}
	codeExample = `import React from 'react';\nimport AnimatedNumber from '@crossfox/react-animated-number';\n
export default function PageExample(){
  return <AnimatedNumber ${codeExample} />
}`

	return <div className="page-example">
		<div className="controls">
			<H2>Props</H2>

			<Grid container spacing={2}>
				<Grid item xs={6}>
					<Input
						helperText="Change the number to start the animation" label="Value"
						value={args.value}
						onChange={setEvent('value', Number)}
					/>
				</Grid>
				<Grid item xs={6}>
					<Input
						type="number"
						maxLength={1}
						label="Round"
						value={args.round}
						onChange={setEvent('round', Number)}
					/>
				</Grid>
				<Grid item xs={6}>
					<Input
						type="range"
						value={args.duration}
						min={0}
						max={10000}
						label="Duration"
						onChange={setEvent('duration')}
					/>

				</Grid>
				<Grid item xs={6}>
					<Input
						type="range"
						value={args.reserve}
						min={0}
						max={10}
						label="Reserve"
						onChange={setEvent('reserve')}
					/>
				</Grid>
				<Grid item xs={6}>
					<Input
						type="range"
						value={args.rate}
						min={1}
						max={120}
						label="Rate"
						onChange={setEvent('rate')}
					/>
				</Grid>
				<Grid item xs={6}>
					<Select
						label="Align"
						value={args.align}
						onChange={setEvent('align')}
						options={{
							left: 'Left',
							right: 'Right',
						}}
					/>
				</Grid>
				<Grid item xs={6}>
					<Input
						label="Prefix"
						value={args.prefix}
						onChange={setEvent('prefix')}
					/>
				</Grid>
				<Grid item xs={6}>
					<Input
						label="Suffix"
						value={args.suffix}
						onChange={setEvent('suffix')}
					/>
				</Grid>

				<Grid item xs={6}>
					<Input
						type="switch"
						label="Show arrow"
						onChange={(e) => setCall('showArrow', e.target.checked)}
						value={args.showArrow}
					/>

				</Grid>

				<Grid item xs={6}>
					<Input
						type="switch"
						label="Reserve minus space"
						onChange={(e) => setCall('reserveMinusSpace', e.target.checked)}
						value={args.reserveMinusSpace}
					/>
				</Grid>

				<Grid item xs={12} sx={{textAlign: 'center', marginTop: '30px'}}>
					<Button variant="text"
					        href="https://www.npmjs.com/package/@crossfox/react-animated-number">Documentation
						and install</Button>
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
			<CopyToClipboard text={codeExample}>
				<div className="copy">
					<Highlight language="javascript">
						{codeExample}
					</Highlight>
				</div>
			</CopyToClipboard>
		</div>

	</div>
}

export default AnimatedNumberPage
