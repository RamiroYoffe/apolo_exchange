import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

function NewOrder(props) {
	const [name, setName] = useState('')
	const [cbu, setCbu] = useState('')
	const [cuil, setCuil] = useState('')
	const [mail, setMail] = useState('')
	const [correctInfo, setCorrectInfo] = useState(0)
	const { currencyA, amountA, currencyB, amountB } = props.transInfo
	const history = useHistory()

	function createOrder() {
		if (name !== '' && cbu !== '' && cuil !== '' && correctInfo) {
			axios
				.post('http://localhost:5000/order', {
					cbu: cbu,
					cuil: cuil,
					account_name: name,
					user_name: name,
					mail: mail,
					amountSent: amountA,
					amountRecieved: amountB,
					currencySent: currencyA.curr,
					currencyRecieved: currencyB.curr,
					systemSent: currencyA.system,
					systemRecieved: currencyB.system,
				})
				.then(function (response) {
					console.log(response)
					history.push(`/orderConfirmed`)
				})
				.catch(function (error) {
					console.log(error)
				})
		} else {
			console.log('theres data missing')
		}
	}

	function validateEmail(email) {
		setMail(email)
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		setCorrectInfo(re.test(String(email).toLowerCase()))
	}

	return (
		<div>
			<fieldset>
				<fieldset>
					<legend>Tu nombre y apellido:</legend>
					<input
						value={name}
						onChange={(e) => setName(e.target.value)}
					></input>
				</fieldset>
				<fieldset>
					<legend>Tu cbu:</legend>
					<input
						value={cbu}
						onChange={(e) => setCbu(e.target.value)}
					></input>
				</fieldset>
				<fieldset>
					<legend>Tu cuil:</legend>
					<input
						value={cuil}
						onChange={(e) => setCuil(e.target.value)}
					></input>
				</fieldset>
				<fieldset>
					<legend>Tu mail:</legend>
					<input
						value={mail}
						onChange={(e) => validateEmail(e.target.value)}
					></input>
					{correctInfo === false ? <label>Invalid email</label> : ''}
					{correctInfo === true ? '✓' : ''}
				</fieldset>
			</fieldset>
			<button onClick={createOrder}>Create order</button>
		</div>
	)
}

export default NewOrder
