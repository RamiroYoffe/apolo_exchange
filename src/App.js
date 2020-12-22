import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Main from './components/Main'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import OrderList from './components/OrderList'
import Order from './components/Order'
import CurrencySettings from './components/CurrencySettings'

function App() {
	return (
		<Router>
			<Navbar />
			<Route path='/' exact component={Main} />
			<Route path='/manager' component={Manager} />
			<Route path='/manager/orders' component={OrderList} />
			<Route path='/manager/orders/:id' component={Order} />
			<Route path='/manager/currency' component={CurrencySettings} />
		</Router>
	)
}

export default App
