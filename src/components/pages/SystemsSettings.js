import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { LinkContainer } from 'react-router-bootstrap'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Pagination from 'react-bootstrap/Pagination'

function SystemsSettings() {
	const [data, setData] = useState([])
	const [activeSystems, setActiveSystems] = useState([])
	const [active, setActive] = useState(1)
	let pages = []
	for (let number = 1; number <= Math.round(data.length / 5); number++) {
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

	const systems = activeSystems.map((syst) => (
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

	useEffect(() => {
		setActiveSystems(data.slice(5 * active - 5, 5 * active))
	}, [data, active])

	return (
		<div
			style={{
				height: '100vh',
				background:
					'linear-gradient( to bottom left,rgba(75,0,130,0.9), transparent)',
				backgroundColor: 'orange',
			}}
		>
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
			<LinkContainer to={`/manager/systems/new`}>
				<Button>Crear nuevo sistema</Button>
			</LinkContainer>
		</div>
	)
}

export default SystemsSettings
