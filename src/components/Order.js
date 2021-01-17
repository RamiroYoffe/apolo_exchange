import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'

function Order() {
	const [order, setOrder] = useState({
		cbu: '3453453643',
		cuil: '878347585',
		account_name: 'Guido Boschetti',
		user_name: 'Guido Boschetti',
		mail: 'guido.boschetti3@gmail.com',
		orderNumber: '0000001',
		amountSent: 10,
		amountRecieved: 30,
		currencySent: 'BTC',
		currencyRecieved: 'ARG',
	})
	const [readOnly, setReadOnly] = useState(true)
	let { orderNum } = useParams()

	useEffect(() => {
		axios
			.get(`http://localhost:5000/order/number/${orderNum}`)
			.then((response) => {
				setOrder(response.data.Orders[0].doc)
			})
	}, [orderNum])

	function enableEdit() {
		setReadOnly(false)
	}

	return (
		<Form>
			<Form.Group as={Row} controlId='formPlaintextEmail'>
				<Form.Label column sm='2'>
					Email
				</Form.Label>
				<Col sm='10'>
					<Form.Control readOnly={readOnly} defaultValue={order.mail} />
				</Col>
			</Form.Group>
			<Form.Group as={Row} controlId='formPlaintextEmail'>
				<Form.Label column sm='2'>
					Nombre y Apellido
				</Form.Label>
				<Col sm='10'>
					<Form.Control
						readOnly={readOnly}
						defaultValue={order.user_name}
					/>
				</Col>
			</Form.Group>
			<Form.Group as={Row} controlId='formPlaintextEmail'>
				<Form.Label column sm='2'>
					CUIL
				</Form.Label>
				<Col sm='10'>
					<Form.Control readOnly={readOnly} defaultValue={order.cuil} />
				</Col>
			</Form.Group>
			<Form.Group as={Row} controlId='formPlaintextEmail'>
				<Form.Label column sm='2'>
					CBU
				</Form.Label>
				<Col sm='10'>
					<Form.Control readOnly={readOnly} defaultValue={order.cbu} />
				</Col>
			</Form.Group>
			<Form.Group as={Row} controlId='formBasicUSDValue'>
				<Form.Label column sm='2'>
					Cambio
				</Form.Label>
				<Col sm='2'>
					<Form.Control
						readOnly={readOnly}
						defaultValue={order.amountSent}
					/>
				</Col>
				<Col sm='2'>
					<Form.Control
						readOnly={readOnly}
						defaultValue={order.currencySent}
					/>
				</Col>
				→
				<Col sm='2'>
					<Form.Control
						readOnly={readOnly}
						defaultValue={order.amountRecieved}
					/>
				</Col>
				<Col sm='2'>
					<Form.Control
						readOnly={readOnly}
						defaultValue={order.currencyRecieved}
					/>
				</Col>
			</Form.Group>
			<Button variant='primary' onClick={enableEdit}>
				Editar Orden
			</Button>
			{readOnly ? '' : <Button variant='primary'>Guardar Orden</Button>}
		</Form>
	)
}

export default Order
