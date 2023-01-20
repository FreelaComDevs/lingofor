import React, { Component } from 'react'
import { translate } from 'react-i18next'
import { cap } from '../../helpers/helpers'

class InputLevels extends Component {
    render() {
        const { t, type, name, value, onChange, required, error} = this.props
        const levelOptions = [ t("BEGINNER"), t("INTERMEDIARY"), t("ADVANCED") ].map( (option, index) => { return { id: Boolean(index), name: option }})

        return (
            <div className={`lineInput lineInput${type} lineInput${cap(name)} ${error ? "invalid" : ""}`}>
                <label htmlFor={name}>{ t("LEVEL") }</label>
                { required && <span>{ t('REQUIRED_FIELD')}</span> }
                <div className="select-wrapper">
                    <select name={name} value={value} onChange={(e) => onChange(e, name)}>
                        <option value={""} > { t("SELECT") }</option>
                        { levelOptions.map((option) => <option key={option.name} value={option.id}> {option.name} </option> )}
                    </select>
                </div>
            </div>
        )
    }
} 

export default translate('translations')(InputLevels)