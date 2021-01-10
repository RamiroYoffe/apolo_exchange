import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function OrderList() {
	const [info, setInfo] = useState([])
	useEffect(() => {
		axios.get('http://localhost:5000/order').then((response) => {
			setInfo(response.data.Orders)
		})
	}, [])

	const orders = info.map((ord) => (
		<div key={ord.doc._id}>
			<h3>
				{ord.doc.orderNumber} | {ord.doc.user_name} | {ord.doc.amountSent}{' '}
				{ord.doc.currencySent} → {ord.doc.amountRecieved}{' '}
				{ord.doc.currencyRecieved}
			</h3>
			<Link to={`/manager/orders/${ord.doc.orderNumber}`}>See order</Link>
			<hr />
		</div>
	))

	return (
		<>
			<div>Order List</div>
			{orders}
		</>
	)
}

export default OrderList
