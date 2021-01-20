import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Select from 'react-select'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

function NewSystem() {
	const [system, setSystem] = useState('')
	const [systemCurrency, setSystemCurrency] = useState('')
	const [systemFields, setSystemFields] = useState('')
	const [systemVisible, setSystemVisible] = useState(true)
	const fieldsOptions = [
		{ value: 'mail', label: 'Mail' },
		{ value: 'name', label: 'Nombre y apellido' },
		{ value: 'CBU', label: 'CBU' },
		{ value: 'CUIL', label: 'CUIL' },
	]

	let { systemName } = useParams()
	const history = useHistory()

	useEffect(() => {
		if (systemName !== 'new') {
			axios
				.get(`http://localhost:5000/system/${systemName}`)
				.then((response) => {
					setSystem(response.data.systems[0].doc.value)
					setSystemCurrency(response.data.systems[0].doc.currency)
					setSystemFields(response.data.systems[0].doc.fields)
					setSystemVisible(response.data.systems[0].doc.visible)
				})
				.catch(function (error) {
					console.log(error)
				})
		}
	}, [systemName])

	function createSystem() {
		if (system !== '' && systemCurrency !== '' && systemFields !== '') {
			if (systemName === 'new') {
				axios
					.post('http://localhost:5000/system', {
						fields: systemFields,
						value: system,
						label: system,
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
						{ propName: 'value', value: system },
						{ propName: 'label', value: system },
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

	return (
		<div>
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
				</Form.Group>

				<Form.Label>Campos a completar</Form.Label>

				<Form.Row>
					<Col sm='3'>
						<Button variant='primary' onClick={createSystem}>
							{systemName === 'new' ? 'Crear sistema' : 'Editar sistema'}
						</Button>
					</Col>
				</Form.Row>
			</Form>
			<Select
				placeholder='Selecionar...'
				value={systemFields}
				onChange={setSystemFields}
				options={fieldsOptions}
				backspaceRemovesValue
				isMulti
				name='fields'
				className='basic-multi-select'
				classNamePrefix='select'
			/>
		</div>
	)
}

export default NewSystem
