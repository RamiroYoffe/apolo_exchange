import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'

function CurrencySelector(props) {
	const [selectedOpt, setSelectedOpt] = useState(props.value.system)

	const currencies = props.currencies.map((curr) => (
		<optgroup label={curr.doc.name} key={curr.doc.name}>
			<option
				key={curr.doc._id}
				disabled={!curr.doc.visible}
				value={curr.doc.system}
			>
				{curr.doc.system === selectedOpt
					? curr.doc.system
					: `${props.convertTo(
							props.amount,
							curr.doc.system,
							props.otherCurrencyValue
					  )} ${curr.doc.system}`}
			</option>
		</optgroup>
	))

	function handleChange(e) {
		setSelectedOpt(e.target.value)
		props.onSelectChange(
			e.target.value,
			props.findCurrencyData(e.target.value, 'n'),
			props.option,
			props.convertTo(props.amount, e.target.value, props.otherCurrencyValue)
		)
	}

	return (
		<Form.Control
			value={selectedOpt}
			onChange={handleChange}
			as='select'
			custom
		>
			{currencies}
		</Form.Control>
	)
}

export default CurrencySelector
