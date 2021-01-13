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
	const [correctInfo, setCorrectInfo] = useState(0)
	const { currencyA, amountA, currencyB, amountB } = props.transInfo
	const history = useHistory()

	function createOrder() {
		if (name !== '' && cbu !== '' && cuil !== '' && correctInfo) {
			axios
				.post('http://localhost:5000/order', {
					cbu: cbu,
					cuil: cuil,
					account_name: name,
					user_name: name,
					mail: mail,
					amountSent: amountA,
					amountRecieved: amountB,
					currencySent: currencyA.curr,
					currencyRecieved: currencyB.curr,
					systemSent: currencyA.system,
					systemRecieved: currencyB.system,
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

			<Form.Group controlId='formBasicName'>
				<Form.Label>Nombre y Apellido</Form.Label>
				<Form.Control
					type='name'
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</Form.Group>
			<Form.Group controlId='formBasicCuil'>
				<Form.Label>CUIL</Form.Label>
				<Form.Control
					value={cuil}
					onChange={(e) => setCuil(e.target.value)}
				/>
			</Form.Group>
			<Form.Group controlId='formBasicCBU'>
				<Form.Label>CBU</Form.Label>
				<Form.Control
					value={cbu}
					onChange={(e) => setCbu(e.target.value)}
				/>
			</Form.Group>

			<Button variant='primary' onClick={createOrder}>
				Crear Orden
			</Button>
		</Form>
	)
}

export default NewOrder
