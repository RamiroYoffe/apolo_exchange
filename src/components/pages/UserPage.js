import React from 'react'
import { useAuth } from '../Auth/use-auth'

function UserPage() {
	const auth = useAuth()
	return (
		<div
			style={{
				height: '100vh',
				background:
					'linear-gradient( to bottom left,rgba(75,0,130,0.9), transparent)',
				backgroundColor: 'orange' /*this your primary color*/,
			}}
		>
			{auth.user.data.mail}
		</div>
	)
}

export default UserPage
