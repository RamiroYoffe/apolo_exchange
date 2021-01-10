const http = require('http') // Import HTTP
const app = require('./app')

const port = process.env.PORT || 5000 // Puerto. Lo elige automatico o usa 3000

const server = http.createServer(app) //Crear el servidor

server.listen(port, () => {
	console.log('server listening on port 5000')
})
