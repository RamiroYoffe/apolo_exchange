import React from 'react'
import { Link } from 'react-router-dom'

function Manager() {
	return (
		<div
			style={{
				height: '100vh',
				background:
					'linear-gradient( to bottom left,rgba(75,0,130,0.9), transparent)',
				backgroundColor: 'orange' /*this your primary color*/,
			}}
		>
			<Link to='/manager/orders'>Gestion de ordenes</Link>
			<br />
			<Link to='/manager/systems'>Gestion de sistemas</Link>
			<br />
			<Link to='/manager/transactions'>Gestion de transacciones</Link>
		</div>
	)
}

export default Manager
