import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { LinkContainer } from 'react-router-bootstrap'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Pagination from 'react-bootstrap/Pagination'

function TransactionSettings() {
	const [data, setData] = useState([])
	const [activeTrans, setActiveTrans] = useState([])
	const [active, setActive] = useState(1)
	let pages = []

	for (let number = 1; number <= Math.round(data.length / 10); number++) {
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
		setActiveTrans(data.slice(10 * active - 10, 10 * active))
	}, [data, active])

	const transactions = activeTrans.map((trans) => (
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
		<div
			style={{
				height: '100vh',
				background:
					'linear-gradient( to bottom left,rgba(75,0,130,0.9), transparent)',
				backgroundColor: 'orange',
			}}
		>
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
			<LinkContainer to={`/manager/transactions/new`}>
				<Button>Crear nueva transaccion</Button>
			</LinkContainer>
		</div>
	)
}

export default TransactionSettings
