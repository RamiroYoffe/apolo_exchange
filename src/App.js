import React from 'react'
import { Route, Link, Switch } from 'react-router-dom'

import Main from './components/Main'
import Navbar from './components/Navbar'
import Calculator from './components/Calculator'
import Manager from './components/Manager'
import OrderList from './components/OrderList'
import Order from './components/Order'
import CurrencySettings from './components/CurrencySettings'

function App() {
	return (
		<div>
			<Navbar />
			<Calculator />
			<Switch>
				<Route exact path='/' component={Main} />
				<Route exact path='/manager' component={Manager} />
				<Route exact path='/manager/orders' component={OrderList} />
				<Route path='/manager/orders/:orderId' component={Order} />
				<Route path='/manager/currency' component={CurrencySettings} />
			</Switch>
		</div>
	)
}

export default App
