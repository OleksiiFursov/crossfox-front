import React, { createElement } from 'react'
import '../../package/css/start/src/index.scss';

const tags = ['h1','h2','h3','h4','h5','h6','p'];
function CssStart(){
	return (<>
		<b>Text</b>
		{tags.map(tag => createElement(tag, {}, 'Example tag "'+tag+'"'))}

		<b>List ul\ol</b>
		<ul>
			<li>
				<item>List item 1</item>
				<item>List item 2</item>
				<item>List item 3</item>
				<item>List item 4</item>
				<item>List item 5</item>
			</li>
		</ul>

		<input type="text" />
		<input type="number" />
		<input type="date" />
		<button>Button</button>

		<table>
			<thead>
			<tr>
				<th>Header</th>
				<th>Header</th>
				<th>Header</th>
				<th>Header</th>
				<th>Header</th>
			</tr>
			</thead>
			<tbody>
			<tr>
				<td>Cell 01</td>
				<td>Cell 02</td>
				<td>Cell 03</td>
				<td>Cell 04</td>
				<td>Cell 05</td>
			</tr>
			<tr>
				<td>Cell 01</td>
				<td>Cell 02</td>
				<td>Cell 03</td>
				<td>Cell 04</td>
				<td>Cell 05</td>
			</tr>
			<tr>
				<td>Cell 01</td>
				<td>Cell 02</td>
				<td>Cell 03</td>
				<td>Cell 04</td>
				<td>Cell 05</td>
			</tr>
			<tr>
				<td>Cell 01</td>
				<td>Cell 02</td>
				<td>Cell 03</td>
				<td>Cell 04</td>
				<td>Cell 05</td>
			</tr>
			<tr>
				<td>Cell 01</td>
				<td>Cell 02</td>
				<td>Cell 03</td>
				<td>Cell 04</td>
				<td>Cell 05</td>
			</tr>
			</tbody>
			<tfoot>
			<tr>
				<td>Cell 01</td>
				<td>Cell 02</td>
				<td>Cell 03</td>
				<td>Cell 04</td>
				<td>Cell 05</td>
			</tr>
			</tfoot>

		</table>


	</>)

}

export default CssStart;
