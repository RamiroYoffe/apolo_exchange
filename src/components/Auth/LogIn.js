import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useAuth } from './use-auth'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import InputGroup from 'react-bootstrap/InputGroup'
import { Card, Row } from 'react-bootstrap'

function LogIn() {
	const history = useHistory()
	const location = useLocation()
	const auth = useAuth()
	const [mail, setMail] = useState()
	const [password, setPassword] = useState()

	let { from } = location.state || { from: { pathname: '/' } }
	function login() {
		auth.signin(mail, password, () => {
			history.replace(from)
		})
	}

	function validateEmail(email) {
		if (email === '') {
			return 0
		}
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		const result = re.test(String(email))
		return result
	}
	function validatePassword(pswd) {
		const regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
		const result = regularExpression.test(pswd)
		return result
	}

	return (
		<Container
			fluid
			style={{
				height: '100vh',
				background:
					'linear-gradient( to bottom left,rgba(75,0,130,0.9), transparent)',
				backgroundColor: 'orange' /*this your primary color*/,
			}}
		>
			<Row className='justify-content-md-center'>
				<Col xs='12' sm='10' md='8' lg='6' xl='4'>
					<Card
						bg='light'
						style={{
							alignItems: 'center',
							justifyItems: 'center',
							borderRadius: '5%',
							padding: '2%',
							margin: '10%',
						}}
					>
						<Form>
							<Form.Row>
								<Col xs='12' sm='12' md='12' lg='12' xl='12'>
									<Form.Group controlId='formBasicEmail'>
										<Form.Label>Correo Electronico</Form.Label>
										<InputGroup className='mb-3'>
											<Form.Control
												type='email'
												value={mail}
												onChange={(e) =>
													setMail(e.target.value.toLowerCase())
												}
											/>
											<InputGroup.Append>
												{validateEmail(mail) === false ? (
													<InputGroup.Text id='basic-addon1'>
														Invalid email
													</InputGroup.Text>
												) : (
													''
												)}
												{validateEmail(mail) ? (
													<InputGroup.Text id='basic-addon1'>
														✓
													</InputGroup.Text>
												) : (
													''
												)}
											</InputGroup.Append>
										</InputGroup>
									</Form.Group>
								</Col>
								<Col xs='12' sm='12' md='12' lg='12' xl='12'>
									<Form.Group controlId='formBasicPassword'>
										<Form.Label
											style={{
												marginLeft: '2%',
											}}
										>
											Contraseña
										</Form.Label>
										<Form.Control
											type='password'
											value={password}
											onChange={(e) => setPassword(e.target.value)}
										/>
									</Form.Group>
								</Col>
								<Button
									style={{ margin: '2%' }}
									disabled={
										validateEmail(mail) && validatePassword(password)
											? false
											: true
									}
									className='mx-auto'
									onClick={() => login()}
								>
									Iniciar sesion
								</Button>
							</Form.Row>
						</Form>
					</Card>
				</Col>
			</Row>
		</Container>
	)
}

export default LogIn
