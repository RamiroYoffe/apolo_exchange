import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

function AlertModal(props) {
	return (
		<Modal
			show={props.show}
			onHide={props.onHide}
			aria-labelledby='contained-modal-title-vcenter'
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					{`Borrar ${props.type}`}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<h4>{`Estas seguro que queres borrar ${
					props.type === 'sistema' ? 'este' : 'esta'
				} ${props.type}`}</h4>
				<p>{props.text}</p>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onHide}>Cancelar</Button>
				<Button variant='danger' onClick={props.deleteFunc}>
					{`Borrar ${props.type}`}
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default AlertModal
