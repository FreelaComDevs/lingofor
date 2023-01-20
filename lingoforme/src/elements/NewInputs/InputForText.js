import React from 'react'
import { translate } from 'react-i18next'
import InputText from './InputText'

const InputForText = ({ t, name, label, placeholder, data, inputChange }) => {
    return (
        <div className={`input-${name}`}>
            { label && <label className={data.error?"invalid":""} htmlFor={name}>{ t(label) }</label> }
            { data.required && <span>{ t('REQUIRED_FIELD')}</span> }
            <InputText name={name} placeholder={t(placeholder)} data={data} inputChange={inputChange}/>
        </div>
    )
}

export default translate('translations')(InputForText)

