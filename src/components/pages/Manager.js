import React from 'react'
import { Link } from 'react-router-dom'

function Manager() {
	return (
		<div>
			<Link to='/manager/orders'>Gestion de ordenes</Link>
			<br />
			<Link to='/manager/currency'>Gestion de monedas</Link>
		</div>
	)
}

export default Manager
