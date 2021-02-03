import React from 'react'
import { Link } from 'react-router-dom'

function Manager() {
	return (
		<div>
			<Link to='/manager/orders'>Gestion de ordenes</Link>
			<br />
			<Link to='/manager/systems'>Gestion de sistemas</Link>
			<br />
			<Link to='/manager/transactions'>Gestion de transacciones</Link>
		</div>
	)
}

export default Manager
