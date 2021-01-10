import React, { useState } from 'react'
import Calculator from '../Calculator'
import NewOrder from '../NewOrder'

function Main() {
	const [transactionInfo, setTransctionInfo] = useState({
		firstCurrency: 'USD',
		firstAmount: 0,
		secondCurrency: 'ARS',
		secondAmount: 0,
	})
	const [visible, setVisible] = useState(false)

	function updateValues(amountA, amountB, currencyA, currencyB) {
		setTransctionInfo({ currencyA, amountA, currencyB, amountB })
	}

	return (
		<div>
			<Calculator updateValues={updateValues} setVisible={setVisible} />
			{visible ? <NewOrder transInfo={transactionInfo} /> : <h1> </h1>}
		</div>
	)
}

export default Main
