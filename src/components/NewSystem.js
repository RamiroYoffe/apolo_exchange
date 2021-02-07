import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import AlertModal from './AlertModal'
import Form from 'react-bootstrap/Form'
import Select from 'react-select'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

function NewSystem() {
	const [system, setSystem] = useState('')
	const [systemCurrency, setSystemCurrency] = useState('')
	const [systemFields, setSystemFields] = useState('')
	const [systemVisible, setSystemVisible] = useState(false)
	const fieldsOptions = [
		{ value: 'mail', label: 'Mail' },
		{ value: 'name', label: 'Nombre y apellido' },
		{ value: 'CBU', label: 'CBU' },
		{ value: 'CUIL', label: 'CUIL' },
		{ value: 'bank', label: 'Nombre del banco' },
	]
	const [minAmount, setMinAmount] = useState(0)
	const [show, setShow] = useState(false)
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
					setMinAmount(response.data.systems[0].doc.minimum)
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
						minimum: minAmount,
						visible: false,
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
						{ propName: 'currency', value: systemCurrency },
						{ propName: 'fields', value: systemFields },
						{ propName: 'minimum', value: minAmount },
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

	function deleteFunc() {
		axios
			.delete(`http://localhost:5000/system/${system}`)
			.then(function (response) {
				console.log(response)
				history.push(`/manager/systems`)
			})
			.catch(function (error) {
				console.log(error)
			})
	}

	return (
		<>
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
						<Col sm='3'>
							<Form.Label>Cantidad minima</Form.Label>
							<Form.Control
								type='number'
								value={minAmount}
								onChange={(e) => setMinAmount(e.target.value)}
							/>
						</Col>
					</Form.Row>
				</Form.Group>
				<Form.Label>Campos a completar</Form.Label>
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
				<Form.Row>
					<Col sm='3'>
						<Button variant='primary' onClick={createSystem}>
							{systemName === 'new' ? 'Crear sistema' : 'Editar sistema'}
						</Button>
					</Col>
					<Col sm='3'>
						<Button variant='danger' onClick={() => setShow(true)}>
							Borrar sistema
						</Button>
					</Col>
				</Form.Row>
			</Form>
			<AlertModal
				type={'sistema'}
				text={system}
				deleteFunc={deleteFunc}
				show={show}
				onHide={() => setShow(false)}
			/>
		</>
	)
}

export default NewSystem
