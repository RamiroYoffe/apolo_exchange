// import React, { useState, useEffect } from 'react'
// import Button from 'react-bootstrap/Button'

// function LoadingButton(props) {
// 	const [isLoading, setLoading] = useState(false)

// 	useEffect(() => {
// 		if (isLoading) {
//             props.func()
//             setLoading(props.loading)
// 		}
// 	}, [isLoading])

// 	const handleClick = () => {
// 		setLoading(true)
// 	}

// 	return (
// 		<Button
// 			variant='primary'
// 			disabled={isLoading}
// 			onClick={!isLoading ? handleClick : null}
// 		>
// 			{isLoading ? 'Loading…' : props.text}
// 		</Button>
// 	)
// }
// export default LoadingButton
