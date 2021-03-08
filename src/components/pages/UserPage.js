import React, { useState, useEffect } from 'react'
import { useAuth } from '../Auth/use-auth'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'

function UserPage() {
	const auth = useAuth()
	const [userName, setUserName] = useState(auth.user.user_name)
	const [accountName, setAccountName] = useState(auth.user.account_name)
	const [cbu, setCbu] = useState(auth.user.cbu)
	const [cuil, setCuil] = useState(auth.user.cuil)
	const [mail, setMail] = useState(auth.user.mail)
	const [bank, setBank] = useState(auth.user.bank)
	const [correctInfo, setCorrectInfo] = useState(0)
	const history = useHistory()

	function checkAlive() {
		auth.checkAlive()
	}

	useEffect(() => {
		checkAlive()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	function validateEmail(email) {
		setMail(email)
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		setCorrectInfo(re.test(String(email).toLowerCase()))
	}

	function saveUserChange() {
		axios
			.patch(`http://localhost:5000/user`, [
				{ propName: 'cbu', value: cbu },
				{ propName: 'cuil', value: cuil },
				{ propName: 'bank', value: bank },
				{ propName: 'user_name', value: userName },
				{ propName: 'account_name', value: accountName },
				{ propName: 'mail', value: mail },
			])
			.then(function (response) {
				console.log(response)
				history.push(`/account`)
			})
			.catch(function (error) {
				console.log(error)
			})
	}

	return (
		<div
			style={{
				height: '100vh',
				background:
					'linear-gradient( to bottom left,rgba(75,0,130,0.9), transparent)',
				backgroundColor: 'orange' /*this your primary color*/,
			}}
		>
			<Form>
				<Form.Row>
					<Col sm='3'>
						<Form.Label>Correo Electronico</Form.Label>
						<InputGroup className='mb-3'>
							<Form.Control
								type='email'
								value={mail}
								onChange={(e) => validateEmail(e.target.value)}
							/>
							<InputGroup.Append>
								{correctInfo === false ? (
									<InputGroup.Text id='basic-addon1'>
										Invalid email
									</InputGroup.Text>
								) : (
									''
								)}
								{correctInfo === true ? (
									<InputGroup.Text id='basic-addon1'>
										✓
									</InputGroup.Text>
								) : (
									''
								)}
							</InputGroup.Append>
						</InputGroup>
					</Col>
				</Form.Row>
				<Form.Row>
					<Col sm='3'>
						<Form.Label>Nombre de usuario</Form.Label>
						<Form.Control
							type='name'
							value={userName}
							onChange={(e) => setUserName(e.target.value)}
						/>
					</Col>
				</Form.Row>
				<Form.Row>
					<Col sm='3'>
						<Form.Label>Nombre de cuenta</Form.Label>
						<Form.Control
							type='name'
							value={accountName}
							onChange={(e) => setAccountName(e.target.value)}
						/>
					</Col>
				</Form.Row>
				<Form.Row>
					<Col sm='3'>
						<Form.Label>CUIL</Form.Label>
						<Form.Control
							value={cuil}
							type='text'
							maxLength='11'
							onChange={(e) => setCuil(e.target.value)}
						/>
					</Col>
				</Form.Row>
				<Form.Row>
					<Col sm='3'>
						<Form.Label>CBU</Form.Label>
						<Form.Control
							value={cbu}
							type='text'
							maxLength='22'
							onChange={(e) => setCbu(e.target.value)}
						/>
					</Col>
				</Form.Row>
				<Form.Row>
					<Col sm='3'>
						<Form.Label>Nombre del banco</Form.Label>
						<Form.Control
							value={bank}
							type='text'
							onChange={(e) => setBank(e.target.value)}
						/>
					</Col>
				</Form.Row>
				<Button variant='primary' onClick={saveUserChange}>
					Editar los datos de usuario
				</Button>
			</Form>
		</div>
	)
}

export default UserPage
