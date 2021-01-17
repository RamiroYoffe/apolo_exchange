import React, { useState } from 'react'
const AuthContext = React.createContext()

function AuthContextProvider(props) {
	const [auth, setAuth] = useState({
		token: undefined,
		user: undefined,
	})

	function toggleAuth() {
	}

	return (
		<AuthContext.Provider value={{ auth, toggleAuth }}>
			{props.children}
		</AuthContext.Provider>
	)
}

export { AuthContextProvider, AuthContext }
