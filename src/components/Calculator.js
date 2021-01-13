/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CurrencyInput from './CurrencyInput'
import CurrencySelector from './CurrencySelector'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

function Calculator(props) {
	const [amount, setAmount] = useState(0)
	const [operation, setOperation] = useState('')
	const [firstCurrency, setFirstCurrency] = useState({
		system: 'paypal',
		curr: 'USD',
	})
	const [secondCurrency, setSecondCurrency] = useState({
		system: 'transferencia',
		curr: 'ARS',
	})
	const [info, setInfo] = useState([])
	console.log(operation)

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
			setOperation('buying')
			setFirstCurrency({ system: currentSystem, curr: currentCurrency })
		} else {
			setOperation('selling')
			setSecondCurrency({ system: currentSystem, curr: currentCurrency })
		}
	}

	function convertTo(amount, convert) {
		const input = parseFloat(amount)
		if (Number.isNaN(input)) {
			return ''
		}
		const output = convert(input)
		return output
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
			firstCurrency.curr !== secondCurrency.curr
		) {
			props.setVisible(true)
		}
	}

	return (
		<div>
			<div
				className='p-3 mb-2 bg-light'
				style={{ width: '30vw', borderRadius: '10%' }}
			>
				<Form>
					<Form.Group controlId='CustomSelect'>
						<Form.Label>Quiero vender: {firstCurrency.curr}</Form.Label>
						<Form.Row>
							<Col sm='auto'>
								<CurrencyInput
									operation='selling'
									amount={firstAmount}
									onAmountChange={handleAmountChange}
								/>
							</Col>
							<Col sm='5'>
								<CurrencySelector
									amount={secondAmount}
									otherValue={findCurrencyData(secondCurrency.system)}
									currency={firstCurrency}
									currencies={info}
									option={1}
									onSelectChange={handleSelectChange}
									changeOperation={setOperation}
								/>
							</Col>
						</Form.Row>
					</Form.Group>
					<Button
						className='mb-2 mx-auto'
						style={{
							color: 'white',
							backgroundColor: 'indigo',
							borderRadius: '50%',
						}}
						onClick={switchCurrencies}
					>
						⇅
					</Button>
					<Form.Group controlId='CustomSelect2'>
						<Form.Label>Quiero comprar: {secondCurrency.curr}</Form.Label>
						<Form.Row>
							<Col sm='auto'>
								<CurrencyInput
									operation='buying'
									amount={secondAmount}
									onAmountChange={handleAmountChange}
								/>
							</Col>
							<Col sm='5'>
								<CurrencySelector
									amount={firstAmount}
									otherValue={findCurrencyData(firstCurrency.system)}
									currency={secondCurrency}
									currencies={info}
									option={2}
									onSelectChange={handleSelectChange}
									changeOperation={setOperation}
								/>
							</Col>
						</Form.Row>
					</Form.Group>
				</Form>
			</div>
			<Button className='mx-auto' onClick={liftState}>
				Siguiente
			</Button>
		</div>
	)
}

export default Calculator
