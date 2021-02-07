/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CurrencyInput from './CurrencyInput'
import CurrencySelector from './CurrencySelector'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import { Card, Row } from 'react-bootstrap'

function Calculator(props) {
	const [firstAmount, setFirstAmount] = useState(0)
	const [secondAmount, setSecondAmount] = useState(0)
	const [firstSystem, setFirstSystem] = useState({
		fields: [
			{
				value: 'mail',
				label: 'Mail',
			},
			{
				value: 'name',
				label: 'Nombre y apellido',
			},
		],
		_id: '601f0009e22a421241c2a9f5',
		value: 'paypal',
		label: 'paypal',
		currency: 'USD',
		visible: true,
		minimum: 10,
	})
	const [secondSystem, setSecondSystem] = useState({
		fields: [
			{
				value: 'mail',
				label: 'Mail',
			},
			{
				value: 'name',
				label: 'Nombre y apellido',
			},
			{
				value: 'CBU',
				label: 'CBU',
			},
			{
				value: 'CUIL',
				label: 'CUIL',
			},
			{
				value: 'bank',
				label: 'Nombre del banco',
			},
		],
		_id: '601f005de22a421241c2a9f7',
		value: 'bancaria',
		label: 'bancaria',
		currency: 'ARS',
		visible: true,
		minimum: 1900,
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
			setSecondAmount(convertTo(currentAmount, firstSystem, secondSystem))
		} else if (currOption === 2) {
			setFirstAmount(convertTo(currentAmount, secondSystem, firstSystem))
			setSecondAmount(currentAmount)
		}
	}

	function handleSelectChange(currentSystem, option) {
		if (option === 1) {
			setFirstSystem(currentSystem)
			setFirstAmount(convertTo(secondAmount, secondSystem, currentSystem))
		} else {
			setSecondSystem(currentSystem)
			setSecondAmount(convertTo(firstAmount, firstSystem, currentSystem))
		}
	}

	function convertTo(amount, thisSystem, otherSystem) {
		const input = parseFloat(amount)
		if (Number.isNaN(input)) {
			return ''
		}
		let output = 0
		if (firstSystem.value === 'paypal' || firstSystem.value === 'paypalEU') {
			if (amount >= 100) {
				output = amount * findCurrencyData(thisSystem, otherSystem).cienMas
			} else {
				output =
					amount * findCurrencyData(thisSystem, otherSystem).cienMenos
			}
		} else {
			output = amount * findCurrencyData(thisSystem, otherSystem).cienMenos
		}
		return output
	}

	function findCurrencyData(firstSystem, secondSystem) {
		for (const i in transactionInfo) {
			if (
				transactionInfo[i].doc.system1.value === firstSystem.value &&
				transactionInfo[i].doc.system2.value === secondSystem.value
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
		setSecondAmount(convertTo(secondAmount, systB.value, systA.value))
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
			<Row>
				<Col sm='auto' lg='5'>
					<Card
						sm='auto'
						bg='light'
						style={{
							alignItems: 'center',
							borderRadius: '10%',
							padding: '2%',
							margin: '2%cd bac',
						}}
					>
						<Form sm='auto'>
							<Form.Group controlId='CustomSelect'>
								<Form.Row>
									<Col xs='8' sm='12'>
										<Form.Label>
											Quiero vender: {firstSystem.currency}
										</Form.Label>
									</Col>
									<Col xs='8' sm='6'>
										<CurrencyInput
											option={1}
											amount={firstAmount}
											onAmountChange={handleAmountChange}
										/>
									</Col>
									<Col xs='8' sm='6'>
										<CurrencySelector
											systems={info}
											amount={secondAmount}
											option={1}
											value={firstSystem.value}
											otherSystem={secondSystem}
											onSelectChange={handleSelectChange}
											convertTo={convertTo}
										/>
									</Col>
									<Col xs='8' sm='12'>
										{firstAmount < firstSystem.minimum ? (
											<Alert key='sellAlert' variant='danger'>
												El monto debe superar los{' '}
												{firstSystem.minimum} {firstSystem.currency}
											</Alert>
										) : (
											''
										)}
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
									<Col xs='8' sm='6'>
										<CurrencyInput
											option={2}
											amount={secondAmount}
											onAmountChange={handleAmountChange}
										/>
									</Col>
									<Col xs='8' sm='6'>
										<CurrencySelector
											systems={info}
											option={2}
											amount={firstAmount}
											value={secondSystem.value}
											otherSystem={firstSystem}
											onSelectChange={handleSelectChange}
											convertTo={convertTo}
										/>
									</Col>
								</Form.Row>
							</Form.Group>
						</Form>
						<Button
							disabled={firstAmount < firstSystem.minimum}
							className='mx-auto'
							onClick={() => liftState(true)}
						>
							Siguiente
						</Button>
					</Card>
				</Col>
				<Col sm='6' xs='12'>
					<Card></Card>
				</Col>
			</Row>
		</div>
	)
}

export default Calculator
