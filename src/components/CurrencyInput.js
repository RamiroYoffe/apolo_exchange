import React from 'react'
import Form from 'react-bootstrap/Form'

function CurrencyInput(props) {
	function handleChange(e) {
		props.onAmountChange(e.target.value, props.option)
	}

	return (
		<Form.Control
			type='number'
			value={props.amount}
			onChange={handleChange}
			onClick={(e) => (e.target.value = '')}
		/>
	)
}

export default CurrencyInput
