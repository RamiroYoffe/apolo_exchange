import React from 'react'
import { Link } from 'react-router-dom'

function Manager() {
	return (
		<div>
			<Link to='/manager/orders'>Orders</Link>
			<Link to='/manager/currency'>Currency Settings</Link>
		</div>
	)
}

export default Manager
