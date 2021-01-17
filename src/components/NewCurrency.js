import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

function NewCurrency() {
	const [currency, setCurrency] = useState({
		name: '',
		value: '',
		system: '',
		visible: true,
	})
	const [usdValue, setUsdValue] = useState(1)
	let { currencySystem } = useParams()
	const history = useHistory()

	useEffect(() => {
		if (currencySystem !== 'new') {
			axios
				.get(`http://localhost:5000/currency/system/${currencySystem}`)
				.then((response) => {
					setCurrency(response.data.currencies[0].doc)
				})
		}
	}, [currencySystem])

	function createCurrency() {
		if (
			currency.name !== '' &&
			currency.system !== '' &&
			currency.value !== 0
		) {
			if (currencySystem === 'new') {
				axios
					.post('http://localhost:5000/currency', {
						name: currency.name,
						value: (1 / usdValue) * currency.value,
						system: currency.system,
						visible: currency.visible,
						code: currency.name,
					})
					.then(function (response) {
						console.log(response)
						history.push(`/manager/currency`)
					})
					.catch(function (error) {
						console.log(error)
					})
			} else {
				console.log(currencySystem)
				axios
					.patch(
						`http://localhost:5000/currency/system/${currencySystem}`,
						[
							{ propName: 'name', value: currency.name },
							{
								propName: 'value',
								value: (1 / usdValue) * currency.value,
							},
							{ propName: 'system', value: currency.system },
							{ propName: 'visible', value: currency.visible },
							{ propName: 'code', value: currency.name },
						]
					)
					.then(function (response) {
						console.log(response)
						history.push(`/manager/currency`)
					})
					.catch(function (error) {
						console.log(error)
					})
			}
		} else {
			console.log('theres data missing')
		}
	}

	return (
		<Form>
			<Form.Group controlId='formBasicSystem'>
				<Form.Row>
					<Col sm='3'>
						<Form.Label>Sistema de transferencia</Form.Label>
						<Form.Control
							value={currency.system}
							onChange={(e) =>
								setCurrency({
									name: currency.name,
									value: currency.value,
									system: e.target.value,
									visible: currency.visible,
								})
							}
						/>
					</Col>
				</Form.Row>
			</Form.Group>
			<Form.Group controlId='formBasicUSDValue'>
				<Form.Label>Cambio</Form.Label>
				<Form.Row>
					<Col sm='2'>
						<Form.Control
							value={usdValue}
							onChange={(e) => setUsdValue(e.target.value)}
						/>
					</Col>
					<Col sm='2'>
						<Form.Control
							placeholder={'Tipo de moneda, Ej: USD'}
							value={currency.name}
							onChange={(e) =>
								setCurrency({
									name: e.target.value,
									value: currency.value,
									system: currency.system,
									visible: currency.visible,
								})
							}
						/>
					</Col>
					=
					<Col sm='2'>
						<Form.Control
							value={currency.value}
							onChange={(e) =>
								setCurrency({
									name: currency.name,
									value: e.target.value,
									system: currency.system,
									visible: currency.visible,
								})
							}
						/>
					</Col>
					<Col sm='1'>
						<Form.Control plaintext placeholder='USD'></Form.Control>
					</Col>
				</Form.Row>
			</Form.Group>

			<Button variant='primary' onClick={createCurrency}>
				{currencySystem === 'new' ? 'Crear Orden' : 'Editar Orden'}
			</Button>
		</Form>
	)
}

export default NewCurrency
