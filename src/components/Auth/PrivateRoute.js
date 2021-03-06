import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from './use-auth.js'

function PrivateRoute({ children, ...rest }) {
	const auth = useAuth()

	function checkAlive() {
		auth.checkAlive()
	}

	useEffect(() => {
		checkAlive()
	}, [])

	return (
		<Route
			{...rest}
			render={({ location }) =>
				auth.alive ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: location },
						}}
					/>
				)
			}
		/>
	)
}

export default PrivateRoute
