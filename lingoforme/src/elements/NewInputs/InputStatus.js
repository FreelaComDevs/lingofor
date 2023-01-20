import React, { Component } from 'react'
import { translate } from 'react-i18next'
import { cap } from '../../helpers/helpers'

class InputStatus extends Component {
    render() {
        const { t, type, name, value, onChange, required, error} = this.props
		const statusOptions = [ "pending", "noShow", "done", "cancelled" ]

        return (
            <div className={`lineInput lineInput${type} lineInput${cap(name)} ${error ? "invalid" : ""}`}>
                <label htmlFor={name}>{ t("STATUS") }</label>
                <div className="select-wrapper">
                    <select name={name} value={value} onChange={(e) => onChange(e.target)}>
                        <option value={""} > { t("SELECT") }</option>
                        { statusOptions.map((option) => <option key={option} value={option}> {t(option.toUpperCase())} </option> )}
                    </select>
                </div>
            </div>
        )
    }
} 

export default translate('translations')(InputStatus)