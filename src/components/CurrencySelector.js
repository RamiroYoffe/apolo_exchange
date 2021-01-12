import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'

function CurrencySelector(props) {
	const [selectedOpt, setSelectedOpt] = useState(props.currency.system)

	const currencies = props.currencies.map((curr) => (
		<optgroup label={curr.doc.name} key={curr.doc.name}>
			<option
				key={curr.doc._id}
				disabled={!curr.doc.visible}
				value={curr.doc.system}
			>
				{curr.doc.system === selectedOpt
					? curr.doc.system
					: `${convertTo(props.amount, curr.doc.system)} ${
							curr.doc.system
					  }`}
			</option>
		</optgroup>
	))

	function handleChange(e) {
		setSelectedOpt(e.target.value)
		props.onSelectChange(
			e.target.value,
			findCurrencyData(e.target.value, 'n'),
			props.option
		)
	}

	function findCurrencyData(currSystem, searchFor) {
		for (const A in props.currencies) {
			if (props.currencies[A].doc.system === currSystem) {
				if (searchFor === 'n') {
					return props.currencies[A].doc.name
				} else if (searchFor === 'v') {
					return props.currencies[A].doc.value
				}
			}
		}
	}

	function convertTo(amount, currSystem) {
		const input = parseFloat(amount)
		if (Number.isNaN(input)) {
			return ''
		}
		const output =
			(props.otherValue / findCurrencyData(currSystem, 'v')) * amount
		return output
	}

	return (
		<Form.Control
			value={props.currency.system}
			onChange={handleChange}
			as='select'
			custom
		>
			{currencies}
		</Form.Control>
	)
}

export default CurrencySelector
