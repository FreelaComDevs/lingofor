import React from 'react'
import { translate } from 'react-i18next'
import { cap } from '../../helpers/helpers'

const InputSwitch = ({ t, type, name, label, value, onChange, required, options, error }) =>  (
  <div className={`lineInput lineInputSwitch lineInput${cap(name)} ${error ? "invalid" : ""}`}>
    { label && <label htmlFor={name}>{ t(label) }</label> }
    { required && <span>{ t('REQUIRED_FIELD')}</span> }
    <div>
      <input id={name} type={"checkbox"} name={name} checked={value} onChange={(e) => onChange(e, name)}/>
      <label className={value ? "isActive" : ""} htmlFor={name}>{value ? t("ACTIVE") : t("INACTIVE") }</label>
    </div>
  </div>
)

export default (translate('translations')(InputSwitch))
