import React, { Component } from 'react'
import { translate } from 'react-i18next'
import { cap } from '../../helpers/helpers'

class InputSelect extends Component {
    render() {
        const { t, type, name, label, value, options, onChange, required, error } = this.props

        return (
            <div className={`lineInput lineInput${type} lineInput${cap(name)} ${error ? "invalid" : ""}`}>
                { label && <label htmlFor={name}>{ t(label) }</label> }
                { required && <span>{ t('REQUIRED_FIELD')}</span> }
                <div className="select-wrapper">
                    <select name={name} value={value} onChange={(e) => onChange(e, name)}>
                        <option className="placeholder" value={""} > { t("SELECT") }</option>
                        { options.map((option) => <option key={option.name} value={option.id}> {option.name} </option> )}
                    </select>
                </div>
            </div>
        )
    }
} 

export default (translate('translations')(InputSelect))