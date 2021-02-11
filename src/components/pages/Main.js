import React, { useState } from 'react'
import Calculator from '../Calculator'
import NewOrder from '../NewOrder'

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
			<Calculator updateValues={updateValues} setVisible={setVisible} />
			{visible ? <NewOrder transInfo={transactionInfo} /> : <h1> </h1>}
		</div>
	)
}

export default Main
