import React from 'react'
import Form from 'react-bootstrap/Form'

function CurrencySelector(props) {
	const currencies = props.currencies.map((curr) => (
		<optgroup label={curr.doc.name} key={curr.doc.name}>
			<option
				key={curr.doc._id}
				disabled={!curr.doc.visible}
				value={curr.doc.system}
			>
				{curr.doc.system}
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

	function findCurrencyData(currSystem) {
		for (const A in props.currencies) {
			if (props.currencies[A].doc.system === currSystem) {
				return props.currencies[A].doc.name
			}
		}
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
