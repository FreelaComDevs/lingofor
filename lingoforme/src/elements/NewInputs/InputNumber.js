import React from 'react'
import { translate } from 'react-i18next'
import { cap } from '../../helpers/helpers'

const InputNumber = ({ t, type, name, label, min, max, value, step, onChange, required, error }) => (
    <div className={`lineInput lineInput${type} lineInput${cap(name)} ${error ? "invalid" : ""}`}>
        { label && <label htmlFor={name}>{ t(label) }</label> }
        { required && <span>{ t('REQUIRED_FIELD')}</span> }
        <input type={"number"} name={name} placeholder={0} value={value} min={min} max={max} onChange={(e) => onChange(e, name)}/>
    </div>
)

export default (translate('translations')(InputNumber))