/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CurrencyInput from './CurrencyInput'
import CurrencySelector from './CurrencySelector'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
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
			setSecondAmount(
				convertTo(
					currentAmount,
					firstSystem.value,
					secondSystem.value,
					currOption
				)
			)
		} else if (currOption === 2) {
			setSecondAmount(currentAmount)
			setFirstAmount(
				convertTo(
					currentAmount,
					firstSystem.value,
					secondSystem.value,
					currOption
				)
			)
		}
	}

	function handleSelectChange(currentSystem, option) {
		if (option === 1) {
			setFirstSystem(currentSystem)
			setFirstAmount(
				convertTo(
					secondAmount,
					secondSystem.value,
					currentSystem.value,
					option
				)
			)
		} else {
			setSecondSystem(currentSystem)
			setSecondAmount(
				convertTo(
					firstAmount,
					firstSystem.value,
					currentSystem.value,
					option
				)
			)
		}
	}

	function convertTo(amount, thisSystem, otherSystem, option) {
		const input = parseFloat(amount)
		if (Number.isNaN(input)) {
			return ''
		}
		let output = 0

		if (thisSystem === 'paypal' || thisSystem === 'paypalEU') {
			amount = amount * 0.946
			amount = amount - 0.3
			if (amount >= 100) {
				output = multiplier(
					option,
					amount,
					findCurrencyData(thisSystem, otherSystem).cienMas
				)
			} else {
				output = multiplier(
					option,
					amount,
					findCurrencyData(thisSystem, otherSystem).cienMenos
				)
			}
		} else {
			output = multiplier(
				option,
				amount,
				findCurrencyData(thisSystem, otherSystem).cienMenos
			)
		}
		return output < 0 ? 0 : output
	}

	function findCurrencyData(thisSystem, otherSystem) {
		for (const i in transactionInfo) {
			if (
				transactionInfo[i].doc.system1.value === thisSystem &&
				transactionInfo[i].doc.system2.value === otherSystem
			) {
				const result = transactionInfo[i].doc.value
				return result
			}
		}
	}

	function switchSistems() {
		const systA = firstSystem
		const systB = secondSystem
		setFirstSystem(systB)
		setSecondSystem(systA)
		setFirstAmount(0)
		setSecondAmount(0)
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

	function multiplier(option, amount, value) {
		return option === 1 ? amount * value : amount / value
	}

	return (
		<Container fluid>
			<Row>
				<Col xs='12' sm='10' md='8' lg='6' xl='4'>
					<Card
						bg='light'
						style={{
							alignItems: 'center',
							justifyItems: 'center',
							borderRadius: '10%',
							padding: '2%',
							margin: '10%',
						}}
					>
						<Form>
							<Form.Row>
								<Col xs='12' sm='12' md='12' lg='12' xl='12'>
									<Form.Label
										style={{
											marginLeft: '2%',
										}}
									>
										Quiero vender: {firstSystem.currency}
									</Form.Label>
								</Col>
								<Col xs='12' sm='6' md='6' lg='6' xl='6	'>
									<CurrencyInput
										option={1}
										amount={firstAmount}
										onAmountChange={handleAmountChange}
									/>
								</Col>
								<Col xs='12' sm='6' md='6' lg='6' xl='6'>
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
								<Col xs='12' sm='12' md='12' lg='12' xl='12'>
									{firstAmount < firstSystem.minimum ? (
										<Form.Text
											muted
											style={{
												marginLeft: '2%',
											}}
										>
											El monto debe superar los {firstSystem.minimum}{' '}
											{firstSystem.currency}
										</Form.Text>
									) : (
										''
									)}
								</Col>

								<Button
									className='mb-2 mx-auto'
									style={{
										margin: '2%',
										color: 'white',
										backgroundColor: 'indigo',
										borderRadius: '50%',
									}}
									onClick={switchSistems}
								>
									⇅
								</Button>

								<Col xs='12' sm='12' md='12' lg='12' xl='12'>
									<Form.Label
										style={{
											marginLeft: '2%',
										}}
									>
										Quiero comprar: {secondSystem.currency}
									</Form.Label>
								</Col>
								<Col xs='12' sm='6' md='6' lg='6' xl='6'>
									<CurrencyInput
										option={2}
										amount={secondAmount}
										onAmountChange={handleAmountChange}
									/>
								</Col>
								<Col xs='12' sm='6' md='6' lg='6' xl='6'>
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
								<Col xs='12' sm='12' md='12' lg='12' xl='12'>
									{secondSystem.value === 'paypal' ||
									secondSystem.value === 'paypalEU' ? (
										<Form.Text id='passwordHelpBlock' muted>
											Recuerde que este precio NO INCLUYE la comision
											de paypal, la misma va a su cargo. La comision
											es 5.4% + 0.3 dolares. En esta transaccion
											puede haber hasta 24 horas de demora en enviar
											el saldo
										</Form.Text>
									) : (
										''
									)}
								</Col>

								<Button
									style={{ margin: '2%' }}
									disabled={firstAmount < firstSystem.minimum}
									className='mx-auto'
									onClick={() => liftState(true)}
								>
									Siguiente
								</Button>
							</Form.Row>
						</Form>
					</Card>
				</Col>
				<Col>
					<Card></Card>
				</Col>
			</Row>
		</Container>
	)
}

export default Calculator
