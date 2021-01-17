import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { LinkContainer } from 'react-router-bootstrap'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

function CurrencySettings() {
	const [data, setData] = useState([])

	const currencies = data.map((curr) => (
		<thead key={curr.doc._id}>
			<tr>
				<th>{curr.doc.system}</th>
				<th>{curr.doc.name}</th>
				<th>
					1{curr.doc.name} = {curr.doc.value}USD
				</th>
				<th>{curr.doc.visible ? 'Disponible' : 'No Disponible'}</th>
				<th>
					<Button
						size='sm'
						onClick={() => {
							let visiblent = !curr.doc.visible
							axios
								.patch(
									`http://localhost:5000/currency/${curr.doc.name}`,
									[
										{
											propName: 'visible',
											value: visiblent,
										},
									]
								)
								.then(function (response) {
									console.log(response)
									if (response.status === 200) {
										window.location.reload()
									}
								})
								.catch(function (error) {
									console.log(error)
								})
						}}
					>
						{curr.doc.visible ? 'Desabilitar' : 'Habilitar'}
					</Button>
				</th>
				<th>
					<LinkContainer to={`/manager/currency/edit/${curr.doc.system}`}>
						<Button size='sm'>Editar</Button>
					</LinkContainer>
				</th>
			</tr>
		</thead>
	))

	useEffect(() => {
		axios.get('http://localhost:5000/currency').then((response) => {
			setData(response.data.currencies)
		})
	}, [])

	return (
		<>
			<h3>Monedas:</h3>
			<Table striped bordered hover size='sm' responsive>
				<thead>
					<tr>
						<th>Sistema</th>
						<th>Nombre</th>
						<th>Email</th>
						<th>Disponible</th>
					</tr>
				</thead>
				{currencies}
			</Table>
			<LinkContainer to={`/manager/currency/edit/new`}>
				<Button>Crear nueva Moneda</Button>
			</LinkContainer>
		</>
	)
}

export default CurrencySettings
