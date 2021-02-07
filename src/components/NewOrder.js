import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function NewOrder(props) {
	const [name, setName] = useState('')
	const [cbu, setCbu] = useState('')
	const [cuil, setCuil] = useState('')
	const [mail, setMail] = useState('')
	const [bank, setBank] = useState('')
	const [correctInfo, setCorrectInfo] = useState(0)
	const { amountA, amountB, systemA, systemB } = props.transInfo
	const fields = [...systemA.fields, ...systemB.fields]
	const history = useHistory()

	function createOrder() {
		if (
			name !== '' &&
			cbu !== '' &&
			cuil !== '' &&
			bank !== '' &&
			correctInfo
		) {
			axios
				.post('http://localhost:5000/order', {
					cbu: cbu,
					cuil: cuil,
					account_name: name,
					user_name: name,
					mail: mail,
					bank: bank,
					amountSent: amountA,
					amountRecieved: amountB,
					currencySent: systemA.currency,
					currencyRecieved: systemB.currency,
					systemSent: systemA.name,
					systemRecieved: systemB.name,
					status: 'A realizar',
				})
				.then(function (response) {
					console.log(response)
					history.push(`/orderConfirmed`)
				})
				.catch(function (error) {
					console.log(error)
				})
		} else {
			console.log('theres data missing')
		}
	}

	function validateEmail(email) {
		setMail(email)
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		setCorrectInfo(re.test(String(email).toLowerCase()))
	}

	return (
		<Form>
			{fields.filter((e) => e.value === 'mail').length > 0 ? (
				<Form.Group controlId='formBasicEmail'>
					<Form.Label>Correo Electronico</Form.Label>
					<InputGroup className='mb-3'>
						<Form.Control
							type='email'
							value={mail}
							onChange={(e) => validateEmail(e.target.value)}
						/>
						<InputGroup.Append>
							{correctInfo === false ? (
								<InputGroup.Text id='basic-addon1'>
									Invalid email
								</InputGroup.Text>
							) : (
								''
							)}
							{correctInfo === true ? (
								<InputGroup.Text id='basic-addon1'>✓</InputGroup.Text>
							) : (
								''
							)}
						</InputGroup.Append>
					</InputGroup>
				</Form.Group>
			) : (
				''
			)}
			{fields.filter((e) => e.value === 'name').length > 0 ? (
				<Form.Group controlId='formBasicName'>
					<Form.Label>Nombre y Apellido</Form.Label>
					<Form.Control
						type='name'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</Form.Group>
			) : (
				''
			)}
			{fields.filter((e) => e.value === 'CUIL').length > 0 ? (
				<Form.Group controlId='formBasicCuil'>
					<Form.Label>CUIL</Form.Label>
					<Form.Control
						value={cuil}
						type='text'
						maxLength='11'
						onChange={(e) => setCuil(e.target.value)}
					/>
				</Form.Group>
			) : (
				''
			)}
			{fields.filter((e) => e.value === 'bank').length > 0 ? (
				<Form.Group controlId='formBasicBank'>
					<Form.Label>Nombre del banco</Form.Label>
					<Form.Control
						value={bank}
						type='text'
						onChange={(e) => setBank(e.target.value)}
					/>
				</Form.Group>
			) : (
				''
			)}
			{fields.filter((e) => e.value === 'CBU').length > 0 ? (
				<Form.Group controlId='formBasicCBU'>
					<Form.Label>CBU</Form.Label>
					<Form.Control
						value={cbu}
						type='text'
						maxLength='22'
						onChange={(e) => setCbu(e.target.value)}
					/>
				</Form.Group>
			) : (
				''
			)}
			<Button variant='primary' onClick={createOrder}>
				Crear Orden
			</Button>
		</Form>
	)
}

export default NewOrder
