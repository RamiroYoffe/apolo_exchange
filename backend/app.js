const express = require('express')
const app = express()
const path = require('path')
const router = express.Router()
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const currencyRoutes = require('./api/routes/currencies')
const userRoutes = require('./api/routes/users')
const orderRoutes = require('./api/routes/orders')
const systemRoutes = require('./api/routes/systems')
const transactionRoutes = require('./api/routes/transactions')

app.use(morgan('dev'))

//app.use("/users", usersRoutes); => Para agregar rutas

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(
	cors({
		origin: ['http://localhost:3000'],
		credentials: true,
	})
)
app.use('/', router)
app.use('/currency', currencyRoutes)
app.use('/user', userRoutes)
app.use('/order', orderRoutes)
app.use('/system', systemRoutes)
app.use('/transaction', transactionRoutes)

app.get('/', (req, res) => {
	res.end('Hello world')
})

app.use((req, res, next) => {
	const error = new Error('Not Found')
	error.status = 404
	next(error)
})

app.use((error, req, res, next) => {
	res.status(error.status || 500)
	res.json({
		error: {
			message: error.message,
		},
	})
})

mongoose.connect(
	'mongodb+srv://lneimark:Og18505bC292835c@apolodb.tiimz.mongodb.net/apoloDB?retryWrites=true&w=majority',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
)
module.exports = app
