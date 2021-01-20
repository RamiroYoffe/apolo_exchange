import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { LinkContainer } from 'react-router-bootstrap'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

function SystemsSettings() {
	const [data, setData] = useState([])

	const systems = data.map((syst) => (
		<thead key={syst.doc._id}>
			<tr>
				<th>{syst.doc.value}</th>
				<th>{syst.doc.currency}</th>
				<th>{syst.doc.visible ? 'Disponible' : 'No Disponible'}</th>
				<th>
					<Button
						size='sm'
						onClick={() => {
							let visiblent = !syst.doc.visible
							axios
								.patch(
									`http://localhost:5000/system/${syst.doc.value}`,
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
						{syst.doc.visible ? 'Desabilitar' : 'Habilitar'}
					</Button>
				</th>
				<th>
					<LinkContainer to={`/manager/systems/${syst.doc.value}`}>
						<Button size='sm'>Editar</Button>
					</LinkContainer>
				</th>
			</tr>
		</thead>
	))

	useEffect(() => {
		axios
			.get('http://localhost:5000/system')
			.then((response) => {
				setData(response.data.Systems)
			})
			.catch(function (error) {
				console.log(error)
			})
	}, [])

	return (
		<>
			<h3>Monedas:</h3>
			<Table striped bordered hover size='sm' responsive>
				<thead>
					<tr>
						<th>Sistema</th>
						<th>Moneda</th>
						<th>Disponible</th>
					</tr>
				</thead>
				{systems}
			</Table>
			<LinkContainer to={`/manager/systems/new`}>
				<Button>Crear nuevo sistema</Button>
			</LinkContainer>
		</>
	)
}

export default SystemsSettings
