import React, { useState, useEffect, useContext, createContext } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const authContext = createContext()

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
	const auth = useProvideAuth()
	return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
	return useContext(authContext)
}

// Provider hook that creates auth object and handles state
function useProvideAuth() {
	const [user, setUser] = useState('fvdf')
	const history = useHistory()

	// Wrap any Firebase methods we want to use making sure ...
	// ... to save the user to state.
	const signin = (mail, password) => {
		axios
			.post('http://localhost:5000/user/login', {
				mail: mail,
				password: password,
			})
			.then(function (response) {
				console.log(response)
				setUser(response)
				history.push(`/`)
			})
			.catch(function (error) {
				console.log(error.message)
			})
	}

	const signup = (mail, password, userName) => {
		axios
			.post('http://localhost:5000/user/register', {
				user_name: userName,
				account_name: userName,
				mail: mail,
				password: password,
			})
			.then(function (response) {
				console.log(response)
				setUser(response)
				history.push(`/`)
			})
			.catch(function (error) {
				console.log(error)
			})
	}

	const signout = () => {
		history.push(`/login`)
		return true
	}

	const sendPasswordResetEmail = (email) => {
		return true
	}

	const confirmPasswordReset = (code, password) => {
		return true
	}

	// Subscribe to user on mount
	// Because this sets state in the callback it will cause any ...
	// ... component that utilizes this hook to re-render with the ...
	// ... latest auth object.
	useEffect(() => {}, [])

	// Return the user object and auth methods
	return {
		user,
		signin,
		signup,
		signout,
		sendPasswordResetEmail,
		confirmPasswordReset,
	}
}
