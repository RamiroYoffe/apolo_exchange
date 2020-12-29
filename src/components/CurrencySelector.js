import React from 'react'

function CurrencySelector(props) {
	const currencies = props.monedas.map((curr) => (
		<option
			key={curr.doc._id}
			disabled={!curr.doc.visible}
			value={curr.doc.name}
		>
			{curr.doc.name}
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
