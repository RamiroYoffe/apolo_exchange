import React, { useContext, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'

import Main from './components/pages/Main'
import CustomNavbar from './components/CustomNavbar'
import Manager from './components/pages/Manager'
import OrderList from './components/pages/OrderList'
import Order from './components/Order'
import CurrencySettings from './components/pages/CurrencySettings'
import NewCurrency from './components/NewCurrency'
import OrderConfirmed from './components/pages/OrderConfirmed'
import UserPage from './components/pages/UserPage'
import LogIn from './components/pages/LogIn'
import SignUp from './components/pages/SignUp'

import { AuthContext } from './components/AuthContext'

function App() {
	const authContext = useContext(AuthContext)

	useEffect(() => {
		
	}, [])

	return (
		<>
			<CustomNavbar />
			<Switch>
				<Route exact path='/' component={Main} />
				<Route exact path='/login' component={LogIn} />
				<Route exact path='/signup' component={SignUp} />
				<Route exact path='/user' component={UserPage} />
				<Route exact path='/orderConfirmed' component={OrderConfirmed} />
				<Route exact path='/manager' component={Manager} />
				<Route exact path='/manager/orders' component={OrderList} />
				<Route exact path='/manager/orders/:orderNum' component={Order} />
				<Route
					exact
					path='/manager/currency'
					component={CurrencySettings}
				/>
				<Route
					path='/manager/currency/edit/:currencySystem'
					component={NewCurrency}
				/>
			</Switch>
		</>
	)
}

export default App
