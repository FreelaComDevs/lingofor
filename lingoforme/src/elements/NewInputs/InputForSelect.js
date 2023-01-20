import React, { Component } from 'react'
import { translate } from 'react-i18next'
import InputSelect from './InputSelect';

class InputForSelect extends Component {
    render() {
        const { t, label, name, data } = this.props

        return (
            <div className={`input-${name}`}>
                { label && <label className={data.error?"invalid":""} htmlFor={name}>{ t(label) }</label> }
                { data.required && <span>{ t('REQUIRED_FIELD')}</span> }
                <InputSelect { ...this.props }/>
            </div>
        )
    }
} 

export default translate('translations')(InputForSelect)