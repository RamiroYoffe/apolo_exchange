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
	const [firstSystem, setFirstSystem] = useState({
		fields: ['mail', 'name'],
		name: 'paypal',
		currency: 'USD',
		visible: true,
	})
	const [secondSystem, setSecondSystem] = useState({
		fields: ['mail', 'name', 'CBU', 'CUIL'],
		name: 'transferencia',
		currency: 'ARS',
		visible: true,
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

	useEffect(() => {
		liftState(false)
	}, [firstAmount, secondAmount, firstSystem, secondSystem])

	function handleAmountChange(currentAmount, currOption) {
		if (currOption === 1) {
			setFirstAmount(currentAmount)
			setSecondAmount(
				convertTo(currentAmount, firstSystem.name, secondSystem.name)
			)
		} else if (currOption === 2) {
			setFirstAmount(
				convertTo(currentAmount, secondSystem.name, firstSystem.name)
			)
			setSecondAmount(currentAmount)
		}
	}

	function handleSelectChange(currentSystem, option) {
		if (option === 1) {
			setFirstSystem(currentSystem)
			setFirstAmount(
				convertTo(secondAmount, secondSystem.name, currentSystem.name)
			)
		} else {
			setSecondSystem(currentSystem)
			setSecondAmount(
				convertTo(firstAmount, firstSystem.name, currentSystem.name)
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

	function switchSistems() {
		const systA = firstSystem
		const systB = secondSystem
		setFirstSystem(systB)
		setSecondSystem(systA)
		setFirstAmount(secondAmount)
		setSecondAmount(convertTo(secondAmount, systB.name, systA.name))
	}

	function liftState(openFields) {
		if (
			firstAmount > 0 &&
			secondAmount > 0 &&
			firstSystem.currency !== secondSystem.currency
		) {
			props.updateValues(
				firstAmount,
				secondAmount,
				firstSystem,
				secondSystem
			)
			if (openFields) {
				props.setVisible(true)
			}
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
						<Form.Label>Quiero vender: {firstSystem.currency}</Form.Label>
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
									value={firstSystem.name}
									otherSystem={secondSystem.name}
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
						onClick={switchSistems}
					>
						⇅
					</Button>
					<Form.Group controlId='CustomSelect2'>
						<Form.Label>
							Quiero comprar: {secondSystem.currency}
						</Form.Label>
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
									value={secondSystem.name}
									otherSystem={firstSystem.name}
									onSelectChange={handleSelectChange}
									convertTo={convertTo}
								/>
							</Col>
						</Form.Row>
					</Form.Group>
				</Form>
			</div>
			<Button className='mx-auto' onClick={() => liftState(true)}>
				Siguiente
			</Button>
		</div>
	)
}

export default Calculator
