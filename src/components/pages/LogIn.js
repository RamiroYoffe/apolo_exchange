import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import { Card, Row } from 'react-bootstrap'

function LogIn() {
	const [mail, setMail] = useState()
	const [password, setPassword] = useState()

	return (
		<Container fluid>
			<Row>
				<Col xs='12' sm='10' md='8' lg='6' xl='4'>
					<Card
						bg='light'
						style={{
							alignItems: 'center',
							justifyItems: 'center',
							borderRadius: '10%',
							padding: '2%',
							margin: '10%',
						}}
					>
						<Form>
							<Form.Row>
								<Col xs='12' sm='12' md='12' lg='12' xl='12'>
									<Form.Label
										style={{
											marginLeft: '2%',
										}}
									>
										Quiero vender:
									</Form.Label>
								</Col>
								<Col xs='12' sm='6' md='6' lg='6' xl='6	'></Col>

								<Col xs='12' sm='12' md='12' lg='12' xl='12'>
									<Form.Label
										style={{
											marginLeft: '2%',
										}}
									>
										Quiero comprar:
									</Form.Label>
								</Col>
								<Col xs='12' sm='6' md='6' lg='6' xl='6'></Col>

								<Button
									style={{ margin: '2%' }}
									className='mx-auto'
									// onClick={() => tryLog()}
								>
									Siguiente
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
