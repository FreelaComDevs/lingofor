import React from 'react'
import { translate } from 'react-i18next'
import { cap } from '../../helpers/helpers'

const InputText = ({ t, type, name, label, placeholder, value, onChange, required, error }) => (
    <div className={`lineInput lineInput${type} lineInput${cap(name)} ${error ? "invalid" : ""}`}>
        { label && <label htmlFor={name}>{ t(label) }</label> }
        { required && <span>{ t('REQUIRED_FIELD')}</span> }
        <input type="text" name={name} placeholder={t(placeholder)} value={value} onChange={(e) => onChange(e, name)}/>
    </div>
)

export default (translate('translations')(InputText))

