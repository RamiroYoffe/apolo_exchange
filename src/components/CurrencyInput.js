import React from 'react'
import Form from 'react-bootstrap/Form'

function CurrencyInput(props) {
	function handleChange(e) {
		props.onAmountChange(e.target.value, props.operation)
	}

	return (
		<Form.Control
			type='number'
			value={props.amount}
			onClick={(e) => (e.target.value = '')}
			onChange={handleChange}
		/>
	)
}

export default CurrencyInput
