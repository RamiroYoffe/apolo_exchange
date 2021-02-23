import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import Pagination from 'react-bootstrap/Pagination'

function OrderList() {
	const [data, setData] = useState([])
	const [activeOrders, setActiveOrders] = useState([])
	const [active, setActive] = useState(1)
	let pages = []
	for (let number = 1; number <= Math.round(data.length / 20); number++) {
		pages.push(
			<Pagination.Item
				key={number}
				active={number === active}
				onClick={() => setActive(number)}
			>
				{number}
			</Pagination.Item>
		)
	}

	useEffect(() => {
		axios.get('http://localhost:5000/order').then((response) => {
			setData(response.data.Orders)
		})
	}, [])

	useEffect(() => {
		setActiveOrders(data.slice(20 * active - 20, 20 * active))
	}, [data, active])

	const orders = activeOrders.map((ord) => (
		<thead key={ord.doc._id}>
			<tr>
				<th>{ord.doc.orderNumber}</th>
				<th>{ord.doc.user_name}</th>
				<th>{ord.doc.mail}</th>
				<th>
					{ord.doc.amountSent} {ord.doc.currencySent} →{' '}
					{ord.doc.amountRecieved} {ord.doc.currencyRecieved}
				</th>
				<th>{ord.doc.status}</th>
				<th>
					<Link to={`/manager/orders/${ord.doc.orderNumber}`}>
						Ver Orden
					</Link>
				</th>
			</tr>
		</thead>
	))

	return (
		<div
			style={{
				height: '100vh',
				background:
					'linear-gradient( to bottom left,rgba(75,0,130,0.9), transparent)',
				backgroundColor: 'orange' /*this your primary color*/,
			}}
		>
			<h3>Lista de ordenes</h3>
			<Table striped bordered hover size='sm' responsive>
				<thead>
					<tr>
						<th>#</th>
						<th>Nombre</th>
						<th>Email</th>
						<th>Transacción</th>
						<th>Status</th>
					</tr>
				</thead>
				{orders}
			</Table>
			<Pagination>
				<Pagination.Prev
					disabled={active === 1}
					onClick={() => setActive(active - 1)}
				/>
				<Pagination>{pages}</Pagination>
				<Pagination.Next
					disabled={active === pages.length}
					onClick={() => setActive(active + 1)}
				/>
			</Pagination>
		</div>
	)
}

export default OrderList
