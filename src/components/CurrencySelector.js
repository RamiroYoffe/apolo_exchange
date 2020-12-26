import React from 'react'
import monedas from '../monedas.json'

function CurrencySelector(props) {
	const currencies = monedas.map((curr) => (
		<option key={curr.id} disabled={curr.disabled} value={curr.name}>
			{curr.name}
		</option>
	))
	function handleChange(e) {
		props.onSelectChange(e.target.value, props.option)
	}

	return (
		<div>
			<select value={props.currency} onChange={handleChange}>
				{currencies}
			</select>
		</div>
	)
}

export default CurrencySelector
