import React from 'react'
import { Link } from 'react-router-dom'
import data from '../Data.json'

function OrderList() {
	const orders = data.map((ord) => (
		<div key={ord.id}>
			<h3>
				{ord.id} | {ord.name} | {ord.sell}
				{ord.sellCurrency} | {ord.status}
			</h3>
			<Link to={`/manager/orders/${ord.id}`}>See order</Link>
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
