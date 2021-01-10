import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

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
	let { orderId } = useParams()

	useEffect(() => {
		axios.get(`http://localhost:5000/order/${orderId}`).then((response) => {
			setOrder(response.data.order)
		})
	}, [orderId])

	return (
		<div>
			<h1>Numero de orden: {order.orderNumber}</h1>
			<br />
			<h3>Creada por: {order.account_name}</h3>
			<h4>CBU:{order.cbu}</h4>
			<h4>CUIL:{order.cuil}</h4>
			<h4>Mail:{order.mail}</h4>
			<h4>
				{order.amountSent} {order.currencySent} → {order.amountRecieved}{' '}
				{order.currencyRecieved}
			</h4>
		</div>
	)
}

export default Order
