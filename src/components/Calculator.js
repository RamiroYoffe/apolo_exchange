/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CurrencyInput from './CurrencyInput'
import CurrencySelector from './CurrencySelector'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

function Calculator(props) {
	const [firstAmount, setFirstAmount] = useState(0)
	const [secondAmount, setSecondAmount] = useState(0)
	const [firstCurrency, setFirstCurrency] = useState({
		system: 'paypal',
		curr: 'USD',
	})
	const [secondCurrency, setSecondCurrency] = useState({
		system: 'transferencia',
		curr: 'ARS',
	})
	const [info, setInfo] = useState([])

	useEffect(() => {
		axios.get('http://localhost:5000/currency').then((response) => {
			setInfo(response.data.currencies)
		})
	}, [])

	function handleAmountChange(currentAmount, currOption) {
		if (currOption === 1) {
			setFirstAmount(currentAmount)
			setSecondAmount(
				convertTo(
					currentAmount,
					secondCurrency.system,
					firstCurrency.system
				)
			)
		} else {
			setFirstAmount(
				convertTo(
					currentAmount,
					firstCurrency.system,
					secondCurrency.system
				)
			)
			setSecondAmount(currentAmount)
		}
	}

	function handleSelectChange(
		currentSystem,
		currentCurrency,
		option,
		newAmount
	) {
		if (option === 1) {
			setFirstCurrency({ system: currentSystem, curr: currentCurrency })
			setFirstAmount(newAmount)
		} else {
			setSecondCurrency({ system: currentSystem, curr: currentCurrency })
			setSecondAmount(newAmount)
		}
	}

	function convertTo(amount, currSystem, otherCurrValue) {
		const input = parseFloat(amount)
		if (Number.isNaN(input)) {
			return ''
		}
		const output =
			(amount * findCurrencyData(otherCurrValue, 'v')) /
			findCurrencyData(currSystem, 'v')
		return output
	}

	function findCurrencyData(currSystem, searchFor) {
		for (const A in info) {
			if (info[A].doc.system === currSystem) {
				if (searchFor === 'n') {
					return info[A].doc.name
				} else if (searchFor === 'v') {
					return info[A].doc.value
				}
			}
		}
	}

	function switchCurrencies() {
		const amountA = firstAmount
		const amountB = secondAmount
		setFirstAmount(amountB)
		setSecondAmount(amountA)
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
									option={1}
									amount={firstAmount}
									onAmountChange={handleAmountChange}
								/>
							</Col>
							<Col sm='5'>
								<CurrencySelector
									amount={secondAmount}
									value={firstCurrency}
									currencies={info}
									option={1}
									onSelectChange={handleSelectChange}
									otherCurrencyValue={secondCurrency.system}
									convertTo={convertTo}
									findCurrencyData={findCurrencyData}
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
									option={2}
									amount={secondAmount}
									onAmountChange={handleAmountChange}
								/>
							</Col>
							<Col sm='5'>
								<CurrencySelector
									amount={firstAmount}
									value={secondCurrency}
									currencies={info}
									option={2}
									onSelectChange={handleSelectChange}
									otherCurrencyValue={firstCurrency.system}
									convertTo={convertTo}
									findCurrencyData={findCurrencyData}
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
