import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Main from './components/pages/Main'
import Navbar from './components/CustomNavbar'
import Manager from './components/pages/Manager'
import OrderList from './components/pages/OrderList'
import Order from './components/Order'
import CurrencySettings from './components/pages/CurrencySettings'
import NewCurrency from './components/NewCurrency'
import OrderConfirmed from './components/pages/OrderConfirmed'

function App() {
	return (
		<div>
			<Navbar />

			<Switch>
				<Route exact path='/' component={Main} />
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
					path='/manager/currency/:currencySystem'
					component={NewCurrency}
				/>
			</Switch>
		</div>
	)
}

export default App
