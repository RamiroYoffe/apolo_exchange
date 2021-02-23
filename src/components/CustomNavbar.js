import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useAuth } from './Auth/use-auth'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

function CustomNavbar() {
	const auth = useAuth()

	return (
		<Navbar bg='light' expand='lg'>
			<Nav className='mr-auto'>
				<LinkContainer to='/'>
					<Navbar.Brand>Apolo Exchange</Navbar.Brand>
				</LinkContainer>
				<LinkContainer to='/'>
					<Nav.Link>Inicio</Nav.Link>
				</LinkContainer>

				{auth.user ? (
					<Nav className='mr-auto'>
						<LinkContainer to='/manager'>
							<Nav.Link>Configuracion</Nav.Link>
						</LinkContainer>
						<LinkContainer to='/account'>
							<Nav.Link>Cuenta</Nav.Link>
						</LinkContainer>
					</Nav>
				) : (
					<Nav className='mr-auto'>
						<LinkContainer to='/signup'>
							<Nav.Link>Registrarse</Nav.Link>
						</LinkContainer>
						<LinkContainer to='/login'>
							<Nav.Link>Log in</Nav.Link>
						</LinkContainer>
					</Nav>
				)}
			</Nav>
		</Navbar>
	)
}

export default CustomNavbar
