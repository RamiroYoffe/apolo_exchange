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
		<div key={ord.doc.numeroOrden}>
			<h3>
				{ord.doc.numeroOrden} | {ord.doc.nombre_cuenta} |
				{ord.doc.cantidadEnvio} |{ord.doc.monedaEnvio}
				{ord.doc.cantidadRecibo} | {ord.doc.monedaRecibo}
			</h3>
			<Link to={`/manager/orders/${ord.doc.numeroOrden}`}>See order</Link>
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
