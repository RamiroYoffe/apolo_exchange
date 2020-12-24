/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'

function Calculator() {
	const [sellAmount, setSellAmount] = useState('')
	const [buyAmount, setBuyAmount] = useState('')
	const [sellCurrency, setSellCurrency] = useState('USD')
	const [buyCurrency, setBuyCurrency] = useState('ARS')
	const [tasa, setTasa] = useState(120)

	function newBuyAmount() {
		let buyPrice = sellAmount * tasa
		setBuyAmount(buyPrice)
	}

	useEffect(() => {
		newBuyAmount()
	}, [sellAmount])

	useEffect(() => {}, [buyAmount])

	useEffect(() => {
		if (sellCurrency === 'ARS') {
			setTasa(1 / 120)
		} else {
			setTasa(120)
		}
	}, [sellCurrency])

	return (
		<div>
			<div>
				<input
					name='sellAmount'
					type='text'
					placeholder='sell amount'
					value={sellAmount}
					onChange={(e) => setSellAmount(e.target.value)}
				/>
				<label>
					Quiero vender:
					<select
						name='sellCurrency'
						value={sellCurrency}
						onChange={(e) => setSellCurrency(e.target.value)}
					>
						<option value='ARS'>ARS</option>
						<option value='USD'>USD</option>
					</select>
				</label>
			</div>
			<br />
			<div>
				<input
					name='buyAmount'
					type='text'
					placeholder='buy amount'
					value={buyAmount}
					onChange={(e) => setBuyAmount(e.target.value)}
				/>
				<label>
					Quiero comprar:
					<select
						name='buyCurrency'
						value={buyCurrency}
						onChange={(e) => setBuyCurrency(e.target.value)}
					>
						<option value='ARS'>ARS</option>
						<option value='USD'>USD</option>
					</select>
				</label>
			</div>
		</div>
	)
}

export default Calculator
