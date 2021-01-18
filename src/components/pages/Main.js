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
		<>
			<Calculator updateValues={updateValues} setVisible={setVisible} />
			{visible ? <NewOrder transInfo={transactionInfo} /> : <h1> </h1>}
		</>
	)
}

export default Main
