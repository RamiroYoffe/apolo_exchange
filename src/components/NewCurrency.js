import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function NewCurrency() {
	const [currency, setCurrency] = useState({
		name: 'ARS',
		value: 0.0833333333333333333333333,
		system: 'transferencia',
		visible: true,
	})
	let { currencySystem } = useParams()

	useEffect(() => {
		axios
			.get(`http://localhost:5000/currency/system/${currencySystem}`)
			.then((response) => {
				setCurrency(response.data.currencies[0].doc)
			})
	}, [currencySystem])

	return <div>{currency.name}</div>
}

export default NewCurrency
