/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CurrencyInput from './CurrencyInput'
import CurrencySelector from './CurrencySelector'

function Calculator(props) {
	const [amount, setAmount] = useState(0)
	const [operation, setOperation] = useState('')
	const [firstCurrency, setFirstCurrency] = useState({
		system: 'Paypal',
		curr: 'USD',
	})
	const [secondCurrency, setSecondCurrency] = useState({
		system: 'Transferencia',
		curr: 'ARS',
	})
	const [info, setInfo] = useState([])

	const secondAmount =
		operation === 'selling' ? convertTo(amount, toSecond) : amount
	const firstAmount =
		operation === 'buying' ? convertTo(amount, toFirst) : amount

	useEffect(() => {
		axios.get('http://localhost:5000/currency').then((response) => {
			setInfo(response.data.currencies)
		})
	}, [])

	function handleAmountChange(currentAmount, currentOperation) {
		setAmount(currentAmount)
		setOperation(currentOperation)
	}

	function handleSelectChange(currentSystem, currentCurrency, option) {
		if (option === 1) {
			setFirstCurrency({ system: currentSystem, curr: currentCurrency })
		} else {
			setSecondCurrency({ system: currentSystem, curr: currentCurrency })
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
		const valueA = findCurrencyData(firstCurrency.system)
		const valueB = findCurrencyData(secondCurrency.system)
		if (buying) {
			rate = valueA / valueB
		} else {
			rate = valueB / valueA
		}
		return rate
	}

	function findCurrencyData(currSystem) {
		for (const A in info) {
			if (info[A].doc.system === currSystem) {
				return info[A].doc.value
			}
		}
	}

	function switchCurrencies() {
		const valueA = firstCurrency
		const valueB = secondCurrency
		setFirstCurrency(valueB)
		setSecondCurrency(valueA)
		setAmount(firstAmount)
	}

	function liftState() {
		props.updateValues(
			firstAmount,
			secondAmount,
			firstCurrency,
			secondCurrency
		)
		if (
			firstAmount > 0 &&
			secondAmount > 0 &&
			firstCurrency.value !== secondCurrency.value
		) {
			props.setVisible(true)
		}
	}

	return (
		<div>
			<fieldset>
				<legend>Quiero vender: {firstCurrency.curr}</legend>
				<CurrencyInput
					operation='selling'
					amount={firstAmount}
					onAmountChange={handleAmountChange}
				/>
				<CurrencySelector
					currency={firstCurrency}
					currencies={info}
					option={1}
					onSelectChange={handleSelectChange}
				/>
			</fieldset>
			<button onClick={switchCurrencies}>Switch</button>
			<fieldset>
				<legend>Quiero comprar: {secondCurrency.curr}</legend>
				<CurrencyInput
					operation='buying'
					amount={secondAmount}
					onAmountChange={handleAmountChange}
				/>
				<CurrencySelector
					currency={secondCurrency}
					currencies={info}
					option={2}
					onSelectChange={handleSelectChange}
				/>
			</fieldset>
			<button onClick={liftState}>Next</button>
		</div>
	)
}

export default Calculator
