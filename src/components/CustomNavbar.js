import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

function CustomNavbar() {
	return (
		<Navbar bg='light' expand='lg'>
			<Navbar.Brand href='/'>Apolo Exchange</Navbar.Brand>
			<Nav className='mr-auto'>
				<LinkContainer to='/'>
					<Nav.Link>Home</Nav.Link>
				</LinkContainer>
				<LinkContainer to='/manager'>
					<Nav.Link>Settings</Nav.Link>
				</LinkContainer>
			</Nav>
		</Navbar>
	)
}

export default CustomNavbar
