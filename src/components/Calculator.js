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
	const [transactionInfo, setTransactionInfo] = useState([])

	useEffect(() => {
		axios
			.get('http://localhost:5000/transaction')
			.then((response) => {
				setTransactionInfo(response.data.Transactions)
			})
			.catch(function (error) {
				console.log(error)
			})
		axios
			.get('http://localhost:5000/system')
			.then((response) => {
				setInfo(response.data.Systems)
			})
			.catch(function (error) {
				console.log(error)
			})
	}, [])

	function handleAmountChange(currentAmount, currOption) {
		if (currOption === 1) {
			setFirstAmount(currentAmount)
			setSecondAmount(
				convertTo(
					currentAmount,
					firstCurrency.system,
					secondCurrency.system
				)
			)
		} else if (currOption === 2) {
			setFirstAmount(
				convertTo(
					currentAmount,
					secondCurrency.system,
					firstCurrency.system
				)
			)
			setSecondAmount(currentAmount)
		}
	}

	function handleSelectChange(currentSystem, currentCurrency, option) {
		if (option === 1) {
			setFirstCurrency({ system: currentSystem, curr: currentCurrency })
			setFirstAmount(
				convertTo(secondAmount, secondCurrency.system, currentSystem)
			)
		} else {
			setSecondCurrency({ system: currentSystem, curr: currentCurrency })
			setSecondAmount(
				convertTo(firstAmount, firstCurrency.system, currentSystem)
			)
		}
	}

	function convertTo(amount, thisSystem, otherSystem) {
		const input = parseFloat(amount)
		if (Number.isNaN(input)) {
			return ''
		}

		const output = amount * findCurrencyData(thisSystem, otherSystem)
		return output
	}

	function findCurrencyData(firstSystem, secondSystem) {
		for (const i in transactionInfo) {
			if (
				transactionInfo[i].doc.system1 === firstSystem &&
				transactionInfo[i].doc.system2 === secondSystem
			) {
				return transactionInfo[i].doc.value
			}
		}
	}

	function switchCurrencies() {
		const currA = firstCurrency
		const currB = secondCurrency
		setFirstCurrency({ system: currB.system, curr: currB.curr })
		setSecondCurrency({ system: currA.system, curr: currA.curr })
		setFirstAmount(secondAmount)
		setSecondAmount(convertTo(secondAmount, currB.system, currA.system))
	}

	function liftState() {
		if (
			firstAmount > 0 &&
			secondAmount > 0 &&
			firstCurrency.curr !== secondCurrency.curr
		) {
			props.updateValues(
				firstAmount,
				secondAmount,
				firstCurrency,
				secondCurrency
			)
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
									systems={info}
									amount={secondAmount}
									option={1}
									value={firstCurrency.system}
									otherSystem={secondCurrency.system}
									onSelectChange={handleSelectChange}
									convertTo={convertTo}
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
									systems={info}
									option={2}
									amount={firstAmount}
									value={secondCurrency.system}
									otherSystem={firstCurrency.system}
									onSelectChange={handleSelectChange}
									convertTo={convertTo}
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
