import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

function NewSystem() {
	const [system, setSystem] = useState('')
	const [systemCurrency, setSystemCurrency] = useState('')
	const [systemFields, setSystemFields] = useState('')
	const [systemVisible, setSystemVisible] = useState(true)

	let { systemName } = useParams()
	const history = useHistory()

	useEffect(() => {
		if (systemName !== 'new') {
			axios
				.get(`http://localhost:5000/system/${systemName}`)
				.then((response) => {
					setSystem(response.data.systems[0].doc.name)
					setSystemCurrency(response.data.systems[0].doc.currency)
					setSystemFields(response.data.systems[0].doc.fields)
					setSystemVisible(response.data.systems[0].doc.visible)
				})
		}
	}, [systemName])

	function createSystem() {
		if (system !== '' && systemCurrency !== '' && systemFields !== '') {
			if (systemName === 'new') {
				axios
					.post('http://localhost:5000/system', {
						fields: systemFields,
						name: system,
						currency: systemCurrency,
						visible: true,
					})
					.then(function (response) {
						console.log(response)
						history.push(`/manager/systems`)
					})
					.catch(function (error) {
						console.log(error)
					})
			} else {
				axios
					.patch(`http://localhost:5000/system/${systemName}`, [
						{ propName: 'name', value: system },
						// {
						// 	propName: 'value',
						// 	value: (1 / usdValue) * currency.value,
						// },
						{ propName: 'currency', value: systemCurrency },
						{ propName: 'fields', value: systemFields },
						{ propName: 'visible', value: systemVisible },
					])
					.then(function (response) {
						console.log(response)
						history.push(`/manager/systems`)
					})
					.catch(function (error) {
						console.log(error)
					})
			}
		} else {
			console.log('theres data missing')
		}
	}

	function handleClick(e) {
		let currentFields = systemFields
		if (currentFields.includes(e.target.id)) {
			const index = currentFields.indexOf(e.target.id)
			if (index > -1) {
				currentFields.splice(index, 1)
			}
		} else {
			currentFields.push(e.target.id)
		}
		setSystemFields(currentFields)
		console.log(currentFields)
	}

	return (
		<Form>
			<Form.Group controlId='formBasicSystem'>
				<Form.Row>
					<Col sm='3'>
						<Form.Label>Sistema de transferencia</Form.Label>
						<Form.Control
							value={system}
							onChange={(e) => setSystem(e.target.value)}
						/>
					</Col>
					<Col sm='3'>
						<Form.Label>Moneda</Form.Label>
						<Form.Control
							value={systemCurrency}
							onChange={(e) => setSystemCurrency(e.target.value)}
						/>
					</Col>
				</Form.Row>
				<Form.Group as={Row}>
					<Form.Label as='legend' column sm={2}>
						Campos a completar
					</Form.Label>
					<Col sm={10}>
						<Form.Group as={Row} controlId='fieldsChecks'>
							<Col sm={{ span: 10, offset: 2 }}>
								<label>
									<input
										type='checkbox'
										name='mail'
										id='mail'
										checked={systemFields.includes('mail')}
										onChange={handleClick}
										className='form-check-input'
									/>
									mail
								</label>
							</Col>
							<Col sm={{ span: 10, offset: 2 }}>
								<label>
									<input
										type='checkbox'
										name='name'
										id='name'
										checked={systemFields.includes('name')}
										onChange={handleClick}
										className='form-check-input'
									/>
									Nombre y Apellido
								</label>
							</Col>
							<Col sm={{ span: 10, offset: 2 }}>
								<label>
									<input
										type='checkbox'
										name='CBU'
										id='CBU'
										checked={systemFields.includes('CBU')}
										onChange={handleClick}
										className='form-check-input'
									/>
									CBU
								</label>
							</Col>
							<Col sm={{ span: 10, offset: 2 }}>
								<label>
									<input
										type='checkbox'
										name='CUIL'
										id='CUIL'
										checked={systemFields.includes('CUIL')}
										onChange={handleClick}
										className='form-check-input'
									/>
									CUIL
								</label>
							</Col>
						</Form.Group>
					</Col>
				</Form.Group>
			</Form.Group>

			<Button variant='primary' onClick={createSystem}>
				{systemName === 'new' ? 'Crear sistema' : 'Editar sistema'}
			</Button>
		</Form>
	)
}

export default NewSystem
