import React from 'react'
import Form from 'react-bootstrap/Form'

function CurrencySelector(props) {
	const systems = props.systems.map((curr) => (
		<optgroup label={curr.doc.currency} key={curr.doc.currency}>
			<option
				key={curr.doc._id}
				disabled={
					!curr.doc.visible || curr.doc.value === props.otherSystem.value
				}
				value={curr.doc.value}
			>
				{curr.doc.value === props.value ||
				curr.doc.value === props.otherSystem.value
					? curr.doc.value
					: //	`${props.convertTo(
					  // 		props.amount,
					  // 		props.otherSystem,
					  // 		curr.doc
					  //   )} ${curr.doc.currency} |
					  curr.doc.value}
			</option>
		</optgroup>
	))

	function handleChange(e) {
		props.onSelectChange(findCurrencyData(e.target.value), props.option)
	}

	function findCurrencyData(system) {
		for (const i in props.systems) {
			if (props.systems[i].doc.value === system) {
				return props.systems[i].doc
			}
		}
	}

	return (
		<Form.Control
			value={props.value}
			onChange={handleChange}
			as='select'
			custom
		>
			{systems}
		</Form.Control>
	)
}

export default CurrencySelector
