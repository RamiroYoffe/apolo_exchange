import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import AlertModal from './AlertModal'
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
	const history = useHistory()
	const [show, setShow] = useState(false)
	let { orderNum } = useParams()

	useEffect(() => {
		axios
			.get(`http://localhost:5000/order/number/${orderNum}`)
			.then((response) => {
				setOrder(response.data.Orders[0].doc)
			})
	}, [orderNum])

	function setAsDone() {
		axios
			.patch(`http://localhost:5000/order/number/${orderNum}`, [
				{ propName: 'status', value: 'Realizada' },
			])
			.then(function (response) {
				console.log(response)
				history.push(`/manager/orders`)
			})
			.catch(function (error) {
				console.log(error)
			})
	}

	function deleteFunc() {
		axios
			.delete(`http://localhost:5000/order/${order.orderNumber}`)
			.then(function (response) {
				console.log(response)
				history.push(`/manager/orders`)
			})
			.catch(function (error) {
				console.log(error)
			})
	}

	return (
		<>
			<Form>
				<Form.Group as={Row} controlId='formPlaintextEmail'>
					<Form.Label column sm='2'>
						Email
					</Form.Label>
					<Col sm='10'>
						<Form.Control readOnly defaultValue={order.mail} />
					</Col>
				</Form.Group>
				<Form.Group as={Row} controlId='formPlaintextEmail'>
					<Form.Label column sm='2'>
						Nombre y Apellido
					</Form.Label>
					<Col sm='10'>
						<Form.Control readOnly defaultValue={order.user_name} />
					</Col>
				</Form.Group>
				<Form.Group as={Row} controlId='formPlaintextEmail'>
					<Form.Label column sm='2'>
						CUIL
					</Form.Label>
					<Col sm='10'>
						<Form.Control readOnly defaultValue={order.cuil} />
					</Col>
				</Form.Group>
				<Form.Group as={Row} controlId='formPlaintextEmail'>
					<Form.Label column sm='2'>
						CBU
					</Form.Label>
					<Col sm='10'>
						<Form.Control readOnly defaultValue={order.cbu} />
					</Col>
				</Form.Group>
				<Form.Group as={Row} controlId='formBasicUSDValue'>
					<Form.Label column sm='2'>
						Cambio
					</Form.Label>
					<Col sm='2'>
						<Form.Control readOnly defaultValue={order.amountSent} />
					</Col>
					<Col sm='2'>
						<Form.Control readOnly defaultValue={order.currencySent} />
					</Col>
					→
					<Col sm='2'>
						<Form.Control readOnly defaultValue={order.amountRecieved} />
					</Col>
					<Col sm='2'>
						<Form.Control
							readOnly
							defaultValue={order.currencyRecieved}
						/>
					</Col>
				</Form.Group>
				<Button variant='primary' onClick={setAsDone}>
					Marcar como realizada
				</Button>
				<Button variant='danger' onClick={() => setShow(true)}>
					Borrar orden
				</Button>
			</Form>
			<AlertModal
				type={'orden'}
				text={`Orden nro: ${order.orderNumber}`}
				deleteFunc={deleteFunc}
				show={show}
				onHide={() => setShow(false)}
			/>
		</>
	)
}

export default Order
