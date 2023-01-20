import React from 'react'
import moment from 'moment'

import DatePicker from 'react-datepicker';
import InputDatepicker from '../../elements/NewInputs/InputDatepicker'

const InputDate = ({ name, data, inputChange, minDate, maxDate, t, value }) =>  {
  const val =  value || (data && data.value)
  const momentValue = val ? moment(val) : undefined;
  return (
    <div className="select-wrapper">
      <DatePicker id='date' name={name} dateFormat={t('DATE_FORMAT')} 
          showMonthDropdown showYearDropdown
          todayButton={t('TODAY')}
          className={ !momentValue ? "placeholder" : "" }  selected={momentValue} 
          customInput={<InputDatepicker />}
          onChange={inputChange !== undefined ? (e) => inputChange({value: e, name: name}) : () => ({})} 
          />
    </div>
  )
}

export default InputDate
