import React from 'react'

function OrderConfirmed() {
	return (
		<div
			style={{
				height: '100vh',
				background:
					'linear-gradient( to bottom left,rgba(75,0,130,0.9), transparent)',
				backgroundColor: 'orange' /*this your primary color*/,
			}}
		>
			<h1>Tu orden fue creada con exito, muchas gracias!</h1>
			<a href='https://wa.me/+541162939414' target='_blank' rel='noreferrer'>
				Nuestro WhastApp
			</a>
		</div>
	)
}

export default OrderConfirmed
