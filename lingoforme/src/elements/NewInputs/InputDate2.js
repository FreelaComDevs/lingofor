import React from 'react'
import moment from 'moment'

const InputDate = ({ name, data, inputChange, minDate, maxDate }) =>  {
  const { value } = data

  return (
    <div className="select-wrapper">
      <input 
        className={ !value ? "placeholder" : "" } 
        type={"date"} 
        name={name} 
        min={minDate} 
        max={maxDate} 
        value={moment(value).format("YYYY-MM-DD")} 
        onChange={(e) => inputChange(e.target)}
      />
    </div>
  )
}

export default InputDate
