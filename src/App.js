import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './components/Auth/PrivateRoute'
import { ProvideAuth } from './components/Auth/use-auth'
import axios from 'axios'
import './App.css'

import Main from './components/pages/Main'
import CustomNavbar from './components/CustomNavbar'
import Manager from './components/pages/Manager'
import OrderList from './components/pages/OrderList'
import Order from './components/Order'
import SystemsSettings from './components/pages/SystemsSettings'
import NewSystem from './components/NewSystem'
import TransactionSettings from './components/pages/TransactionSettings'
import NewTransaction from './components/NewTransaction'
import OrderConfirmed from './components/pages/OrderConfirmed'
import UserPage from './components/pages/UserPage'
import NoMatch from './components/NoMatch'
import LogIn from './components/Auth/LogIn'
import SignUp from './components/Auth/SignUp'

axios.defaults.withCredentials = true

function App() {
	return (
		<div style={{}}>
			<ProvideAuth>
				<CustomNavbar />
				<Switch>
					<Route exact path='/' component={Main} />
					<Route exact path='/login' component={LogIn} />
					<Route exact path='/signup' component={SignUp} />
					<Route exact path='/orderConfirmed' component={OrderConfirmed} />
					<PrivateRoute exact path='/account'>
						<UserPage />
					</PrivateRoute>
					<PrivateRoute exact path='/manager'>
						<Manager />
					</PrivateRoute>
					<PrivateRoute exact path='/manager/orders'>
						<OrderList />
					</PrivateRoute>
					<PrivateRoute exact path='/manager/orders/:orderNum'>
						<Order />
					</PrivateRoute>
					<PrivateRoute exact path='/manager/systems'>
						<SystemsSettings />
					</PrivateRoute>
					<PrivateRoute exact path='/manager/systems/:systemName'>
						<NewSystem />
					</PrivateRoute>
					<PrivateRoute exact path='/manager/transactions'>
						<TransactionSettings />
					</PrivateRoute>
					<PrivateRoute
						exact
						path='/manager/transactions/:transactionName'
					>
						<NewTransaction />
					</PrivateRoute>
					<Route path='*'>
						<NoMatch />
					</Route>
				</Switch>
			</ProvideAuth>
		</div>
	)
}

export default App
