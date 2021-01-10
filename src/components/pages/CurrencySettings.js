import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function CurrencySettings() {
	const [data, setData] = useState([])

	const currencies = data.map((curr) => (
		<div key={curr.doc._id}>
			<br />
			<h3>
				{curr.doc.system} | {curr.doc.name}| 1{curr.doc.name} ={' '}
				{curr.doc.value}USD |
				{curr.doc.visible ? 'Disponible' : 'No Disponible'}
			</h3>
			<button
				onClick={() => {
					let visiblent = !curr.doc.visible
					axios
						.patch(`http://localhost:5000/currency/${curr.doc._id}`, {
							name: curr.doc.name,
							value: curr.doc.value,
							system: curr.doc.system,
							visible: visiblent,
						})
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
			</button>
			<button>
				<Link to={`/manager/currency/${curr.doc.system}`}>Editar</Link>
			</button>
		</div>
	))

	useEffect(() => {
		axios.get('http://localhost:5000/currency').then((response) => {
			setData(response.data.currencies)
		})
	}, [])

	return (
		<div>
			<h1>Monedas:</h1>
			{currencies}
		</div>
	)
}

export default CurrencySettings
