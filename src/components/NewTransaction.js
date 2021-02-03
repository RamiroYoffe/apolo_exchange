import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import AlertModal from './AlertModal'
import Form from 'react-bootstrap/Form'
import Select from 'react-select'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

function NewTransaction() {
	const [transaction, setTransaction] = useState('')
	const [systemOne, setSystemOne] = useState({ value: '' })
	const [systemTwo, setSystemTwo] = useState({ value: '' })
	const [transactionValue, setTransactionValue] = useState('')
	const [systemsOptions, setSystemsOptions] = useState([])
	let { transactionName } = useParams()
	const [show, setShow] = useState(false)
	const history = useHistory()

	useEffect(() => {
		axios
			.get(`http://localhost:5000/system`)
			.then((response) => {
				// eslint-disable-next-line react-hooks/exhaustive-deps
				const options = response.data.Systems
				const optionList = [...systemsOptions]
				options.map((opt) => optionList.push(opt.doc))
				setSystemsOptions(optionList)
			})
			.catch(function (error) {
				console.log(error)
			})
		if (transactionName !== 'new') {
			axios
				.get(`http://localhost:5000/transaction/${transactionName}`)
				.then((response) => {
					setTransaction(response.data.Transaction[0].doc.name)
					setSystemOne(response.data.Transaction[0].doc.system1)
					setSystemTwo(response.data.Transaction[0].doc.system2)
					setTransactionValue(response.data.Transaction[0].doc.value)
				})
				.catch(function (error) {
					console.log(error)
				})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [transactionName])

	function createTransaction() {
		if (transaction !== '' && systemOne !== '' && systemTwo !== '') {
			if (transactionName === 'new') {
				axios
					.post('http://localhost:5000/transaction', {
						name: transaction,
						system1: systemOne,
						system2: systemTwo,
						value: transactionValue,
					})
					.then(function (response) {
						console.log(response)
						history.push(`/manager/transactions`)
					})
					.catch(function (error) {
						console.log(error)
					})
			} else {
				axios
					.patch(`http://localhost:5000/transaction/${transaction}`, [
						{ propName: 'name', value: transaction },
						// {
						// 	propName: 'value',
						// 	value: (1 / usdValue) * currency.value,
						// },
						{
							propName: 'system1',
							value: {
								value: systemOne.value,
								label: systemOne.label,
								currency: systemOne.currency,
							},
						},
						{
							propName: 'system2',
							value: {
								value: systemTwo.value,
								label: systemTwo.label,
								currency: systemTwo.currency,
							},
						},
						{ propName: 'value', value: transactionValue },
					])
					.then(function (response) {
						console.log(response)
						history.push(`/manager/transactions`)
					})
					.catch(function (error) {
						console.log(error)
					})
			}
		} else {
			console.log('theres data missing')
		}
	}

	function deleteFunc() {
		axios
			.delete(`http://localhost:5000/transaction/${transaction}`)
			.then(function (response) {
				console.log(response)
				history.push(`/manager/transactions`)
			})
			.catch(function (error) {
				console.log(error)
			})
	}

	useEffect(() => {
		if (systemOne.value !== '' && systemTwo.value !== '') {
			setTransaction(`${systemOne.value}-${systemTwo.value}`)
		}
	}, [systemOne, systemTwo])

	return (
		<>
			<Form>
				<Form.Row>
					<Col sm='3'>
						<Form.Label>Nombre</Form.Label>
						<Form.Control value={transaction} readOnly />
					</Col>
				</Form.Row>
				<Form.Row>
					<Col sm='3'>
						<Form.Label>Sistema de venta</Form.Label>
						<Select
							placeholder='Selecionar...'
							value={systemOne}
							onChange={setSystemOne}
							options={systemsOptions}
							backspaceRemovesValue
							name='firstSystem'
							className='basic-multi-select'
							classNamePrefix='select'
						/>
					</Col>
					<Col sm='3'>
						<Form.Label>Sistema de compra</Form.Label>
						<Select
							placeholder='Selecionar...'
							value={systemTwo}
							onChange={setSystemTwo}
							options={systemsOptions}
							backspaceRemovesValue
							name='secondSystem'
							className='basic-multi-select'
							classNamePrefix='select'
						/>
					</Col>
				</Form.Row>
				<Form.Row>
					<Col sm='3'>
						<Form.Label>Valor</Form.Label>
						<Form.Control
							type='number'
							value={transactionValue}
							onChange={(e) => setTransactionValue(e.target.value)}
						/>
					</Col>
				</Form.Row>
				<Form.Row>
					<Col sm='3'>
						<Button variant='primary' onClick={createTransaction}>
							{transactionName === 'new'
								? 'Crear transacción'
								: 'Editar transacción'}
						</Button>
					</Col>
					<Col sm='3'>
						<Button variant='danger' onClick={() => setShow(true)}>
							Borrar transacción
						</Button>
					</Col>
				</Form.Row>
			</Form>
			<AlertModal
				type={'transacción'}
				text={transaction}
				deleteFunc={deleteFunc}
				show={show}
				onHide={() => setShow(false)}
			/>
		</>
	)
}

export default NewTransaction
