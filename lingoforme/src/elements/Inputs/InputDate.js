import React from 'react'
import { translate } from 'react-i18next'
import { cap } from '../../helpers/helpers'

const InputDate = ({ t, type, name, label, value, onChange, minDate, maxDate, required, error }) =>  (
    <div className={`lineInput lineInput${type} lineInput${cap(name)} ${error ? "invalid" : ""}`}>
        { label && <label htmlFor={name}>{ t(label) }</label> }
        { required && <span>{ t('REQUIRED_FIELD')}</span> }
        <div className="select-wrapper">
            <input type={"date"} name={name} min={minDate} max={maxDate} value={value} onChange={(e) => onChange(e, name)}/>
        </div>
    </div>
)

export default (translate('translations')(InputDate))