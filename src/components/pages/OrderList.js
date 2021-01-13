import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Table from 'react-bootstrap/Table'

function OrderList() {
	const [info, setInfo] = useState([])
	useEffect(() => {
		axios.get('http://localhost:5000/order').then((response) => {
			setInfo(response.data.Orders)
		})
	}, [])

	const orders = info.map((ord) => (
		<thead key={ord.doc._id}>
			<tr>
				<th>{ord.doc.orderNumber}</th>
				<th>{ord.doc.user_name}</th>
				<th>{ord.doc.mail}</th>
				<th>
					{ord.doc.amountSent} {ord.doc.currencySent} →{' '}
					{ord.doc.amountRecieved} {ord.doc.currencyRecieved}
				</th>
				<th>
					<Link to={`/manager/orders/${ord.doc.orderNumber}`}>
						See order
					</Link>
				</th>
			</tr>
		</thead>
	))

	return (
		<>
			<h3>Order List</h3>
			<Table striped bordered hover size='sm'>
				<thead>
					<tr>
						<th>#</th>
						<th>Nombre</th>
						<th>Email</th>
						<th>Transaccion</th>
					</tr>
				</thead>
				{orders}
			</Table>
		</>
	)
}

export default OrderList
