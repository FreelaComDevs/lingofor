import React from 'react'

const InputText = ({ name, data, placeholder, inputChange }) => {
	const { value, error } = data
	return (
		<input 
			className={error?"invalid":""}
			name={name} 
			id={name} 
			value={value ? value : ''}
			placeholder={placeholder} 
			onChange={(e) => inputChange(e.target)}
		/>
	)
}

export default InputText

