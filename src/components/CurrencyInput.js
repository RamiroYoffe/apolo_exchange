import React from 'react'

function CurrencyInput(props) {
	function handleChange(e) {
		props.onAmountChange(e.target.value, props.operation)
	}

	return (
		<input
			value={props.amount}
			onClick={(e) => (e.target.value = '')}
			onChange={handleChange}
		/>
	)
}

export default CurrencyInput
