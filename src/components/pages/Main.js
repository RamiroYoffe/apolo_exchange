import React, { useState } from 'react'
import Calculator from '../Calculator'
import NewOrder from '../NewOrder'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'

function Main() {
	const [transactionInfo, setTransctionInfo] = useState({
		firstAmount: 0,
		secondAmount: 0,
		firstSystem: 'USD',
		secondSystem: 'ARS',
	})
	const [visible, setVisible] = useState(false)

	function updateValues(amountA, amountB, systemA, systemB) {
		setTransctionInfo({ amountA, amountB, systemA, systemB })
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
			<Container fluid>
				<Row>
					<Col xs='12' sm='10' md='8' lg='6' xl='4'>
						<Calculator
							updateValues={updateValues}
							setVisible={setVisible}
						/>
					</Col>
					{visible ? (
						<Col>
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
								<NewOrder transInfo={transactionInfo} />
							</Card>
						</Col>
					) : (
						''
					)}
				</Row>
			</Container>
		</div>
	)
}

export default Main
