import React from 'react'

function CurrencySelector(props) {
	const currencies = props.currencies.map((curr) => (
		<optgroup label={curr.doc.name}>
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
		<div>
			<select value={props.currency.system} onChange={handleChange}>
				{currencies}
			</select>
		</div>
	)
}

export default CurrencySelector
