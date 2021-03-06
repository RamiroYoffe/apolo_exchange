import React, { useState, useEffect, useContext, createContext } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const authContext = createContext()

export function ProvideAuth({ children }) {
	const auth = useProvideAuth()
	return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
	return useContext(authContext)
}

function useProvideAuth() {
	const [user, setUser] = useState({
		cbu: '2020202020',
		cuil: '2020200202',
		user_name: 'Rami',
		account_name: 'Rami',
		mail: 'rami@gmail.com',
	})
	const history = useHistory()

	const signin = (mail, password) => {
		axios
			.post('http://localhost:5000/user/login', {
				mail: mail,
				password: password,
			})
			.then(function (response) {
				console.log(response)
				const { token } = response.data
				const { user } = response.data
				setUser(user)
				localStorage.setItem('token', token)
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
				history.push(`/validateEmail`)
			})
			.catch(function (error) {
				console.log(error)
			})
	}

	const checkAlive = () => {
		axios
			.post(
				'http://localhost:5000/user/alive',
				{},
				{
					headers: {
						Authorization: 'TOken',
					},
				}
			)
			.then(function (response) {
				console.log(response)
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

	useEffect(() => {}, [])

	return {
		user,
		signin,
		signup,
		checkAlive,
		signout,
		sendPasswordResetEmail,
		confirmPasswordReset,
	}
}
