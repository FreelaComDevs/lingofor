import React from 'react'
import { translate } from 'react-i18next'
import InputDate from './InputDate'

const InputForDate = (props) =>  {
  const { t, name, label, required, value } = props
  return (
    <div>
      { label && <label htmlFor={name}>{ t(label) }</label> }
      { required && <span>{ t('REQUIRED_FIELD')}</span> }
      <InputDate {...props} />
    </div>
  )
}

export default translate('translations')(InputForDate)
