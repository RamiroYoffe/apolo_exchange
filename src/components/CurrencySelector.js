import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'

function CurrencySelector(props) {
	const systems = props.systems.map((curr) => (
		<optgroup label={curr.doc.currency} key={curr.doc.currency}>
			<option
				key={curr.doc._id}
				disabled={!curr.doc.visible || curr.doc.name === props.otherSystem}
				value={curr.doc.name}
			>
				{curr.doc.name === props.value ||
				curr.doc.name === props.otherSystem
					? curr.doc.name
					: `${props.convertTo(
							props.amount,
							props.otherSystem,
							curr.doc.name
					  )} ${curr.doc.currency} | ${curr.doc.name}`}
			</option>
		</optgroup>
	))

	function handleChange(e) {
		props.onSelectChange(
			e.target.value,
			findCurrencyData(e.target.value),
			props.option
		)
	}

	function findCurrencyData(system) {
		for (const i in props.systems) {
			if (props.systems[i].doc.name === system) {
				return props.systems[i].doc.currency
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
