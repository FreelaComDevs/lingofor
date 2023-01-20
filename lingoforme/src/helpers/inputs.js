export const childChange = (e, name, value, parameter, index, onChange) => {
    e.preventDefault()
    let newValue = value
    if (!parameter) { newValue[index] = e.target.value }
    else { newValue[index][parameter] = e.target.value }
    const data = { target: { value: newValue }}
    onChange(data, name)
}

export const addField = (e, name, value, newItem, onChange) => { 
    e.preventDefault()
    let newValue = value
    newValue.push(newItem)
    const data = { target: { value: newValue }}
    onChange(data, name)
}

export const removeField = (e, name, value, index, onChange) => { 
    e.preventDefault()
    let newValue = value
    newValue.splice(index, 1)
    const data = { target: { value: newValue }}
    onChange(data, name)
}