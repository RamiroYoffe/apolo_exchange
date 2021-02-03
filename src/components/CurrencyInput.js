import React from 'react'
import Form from 'react-bootstrap/Form'

function CurrencyInput(props) {
	function handleChange(e) {
		props.onAmountChange(e.target.value, props.option)
	}

	return (
		<Form.Group>
			<Form.Control
				aria-label={props.option === 1 ? 'sell amount' : 'buy amount'}
				type='number'
				value={props.amount}
				onChange={handleChange}
				onClick={(e) => (e.target.value = '')}
			/>
		</Form.Group>
	)
}

export default CurrencyInput
