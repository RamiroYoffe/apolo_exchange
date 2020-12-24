import React from 'react'
import { useParams } from 'react-router-dom'
import data from '../Data.json'

function Order() {
	let { orderId } = useParams()
	const thisOrder = data.find((ord) => ord.id === orderId)

	return (
		<div>
			<h1>Order number {thisOrder.id} </h1>
		</div>
	)
}

export default Order
