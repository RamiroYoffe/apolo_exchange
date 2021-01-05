import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function Order() {
	const [order, setOrder] = useState({
		order: {
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
		},
	})
	let { orderId } = useParams()

	useEffect(() => {
		axios.get(`http://localhost:5000/order/${orderId}`).then((response) => {
			setOrder(response.data)
		})
	}, [orderId])

	return (
		<div>
			<h1>{order.order.account_name}</h1>
		</div>
	)
}

export default Order
