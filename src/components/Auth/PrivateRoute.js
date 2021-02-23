import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from './use-auth.js'

function PrivateRoute({ children, ...rest }) {
	const auth = useAuth()
	return (
		<Route
			{...rest}
			render={({ location }) =>
				auth.user ? (
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
