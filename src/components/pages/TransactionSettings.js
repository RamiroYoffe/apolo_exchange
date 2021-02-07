import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { LinkContainer } from 'react-router-bootstrap'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

function TransactionSettings() {
	const [data, setData] = useState([])

	const transactions = data.map((trans) => (
		<thead key={trans.doc._id}>
			<tr>
				<th>{trans.doc.system1.value}</th>
				<th>{trans.doc.system2.value}</th>
				<th>
					{trans.doc.system1.value === 'paypal' ||
					trans.doc.system1.value === 'paypalEU'
						? `1 ${trans.doc.system1.currency} = (${trans.doc.value.cienMenos}/${trans.doc.value.cienMas}) ${trans.doc.system2.currency}`
						: `1 ${trans.doc.system1.currency} = ${trans.doc.value.cienMenos}${trans.doc.system2.currency}`}
				</th>
				<th>
					<LinkContainer to={`/manager/transactions/${trans.doc.name}`}>
						<Button size='sm'>Editar</Button>
					</LinkContainer>
				</th>
			</tr>
		</thead>
	))

	useEffect(() => {
		axios
			.get('http://localhost:5000/transaction')
			.then((response) => {
				setData(response.data.Transactions)
			})
			.catch(function (error) {
				console.log(error)
			})
	}, [])

	return (
		<>
			<h3>Transacciones:</h3>
			<Table striped bordered hover size='sm' responsive>
				<thead>
					<tr>
						<th>Sistema Venta</th>
						<th>Sistema Compra</th>
						<th>Cambio</th>
					</tr>
				</thead>
				{transactions}
			</Table>
			<LinkContainer to={`/manager/transactions/new`}>
				<Button>Crear nueva transaccion</Button>
			</LinkContainer>
		</>
	)
}

export default TransactionSettings
