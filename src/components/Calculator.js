/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CurrencyInput from './CurrencyInput'
import CurrencySelector from './CurrencySelector'

function Calculator(props) {
	const [amount, setAmount] = useState(0)
	const [operation, setOperation] = useState('selling')
	const [firstCurrency, setFirstCurrency] = useState('USD')
	const [secondCurrency, setSecondCurrency] = useState('ARS')
	const [info, setInfo] = useState([])

	const secondAmount =
		operation === 'selling' ? convertTo(amount, toSecond) : amount
	const firstAmount =
		operation === 'buying' ? convertTo(amount, toFirst) : amount

	useEffect(() => {
		axios.get('http://localhost:5000/moneda').then((response) => {
			setInfo(response.data.monedas)
		})
	}, [])

	function handleAmountChange(currentAmount, currentOperation) {
		setAmount(currentAmount)
		setOperation(currentOperation)
	}

	function handleSelectChange(currentCurrency, option) {
		if (option === 1) {
			setFirstCurrency(currentCurrency)
		} else {
			setSecondCurrency(currentCurrency)
		}
	}

	function convertTo(amount, convert) {
		const input = parseFloat(amount)
		if (Number.isNaN(input)) {
			return ''
		}
		const output = convert(input)
		return output.toString()
	}

	function toSecond(firstAmount) {
		return firstAmount * calcRate(true)
	}

	function toFirst(secondAmount) {
		return secondAmount * calcRate(false)
	}

	function calcRate(buying) {
		let rate = 0
		const valueA = findCurrencyData(firstCurrency)
		const valueB = findCurrencyData(secondCurrency)
		if (buying) {
			rate = ((valueA / valueB) * 1000) / 1000
		} else {
			rate = ((valueB / valueA) * 1000) / 1000
		}
		return rate
	}

	function findCurrencyData(mone) {
		axios.get(`http://localhost:5000/moneda/ARS`).then((response) => {
			console.log(response.data.monedas[0].doc.valor)
			return response.data.monedas[0].doc.valor
		})
	}

	function switchCurrencies() {
		const valueA = firstCurrency
		const valueB = secondCurrency
		setFirstCurrency(valueB)
		setSecondCurrency(valueA)
		setAmount(firstAmount)
	}

	useEffect(() => {
		props.updateValues(
			firstAmount,
			secondAmount,
			firstCurrency,
			secondCurrency
		)
	}, [amount])

	return (
		<div>
			<fieldset>
				<legend>Quiero vender:</legend>
				<CurrencyInput
					operation='selling'
					amount={firstAmount}
					onAmountChange={handleAmountChange}
				/>
				<CurrencySelector
					currency={firstCurrency}
					monedas={info}
					option={1}
					onSelectChange={handleSelectChange}
				/>
			</fieldset>
			<button onClick={switchCurrencies}>Switch</button>
			<fieldset>
				<legend>Quiero comprar:</legend>
				<CurrencyInput
					operation='buying'
					amount={secondAmount}
					onAmountChange={handleAmountChange}
				/>
				<CurrencySelector
					currency={secondCurrency}
					monedas={info}
					option={2}
					onSelectChange={handleSelectChange}
				/>
			</fieldset>
		</div>
	)
}

export default Calculator
